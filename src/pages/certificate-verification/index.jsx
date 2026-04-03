import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import VerificationCard from './components/VerificationCard';
import HashSearchForm from './components/HashSearchForm';
import VerificationActions from './components/VerificationActions';
import WalletConnectButton from '../../components/ui/WalletConnectButton';
import { useWeb3 } from '../../contexts/Web3Context';
import { verifyCertificateOnChain, formatCertificateHash } from '../../services/blockchainService';

const CertificateVerification = () => {
  const { hash } = useParams();
  const [searchParams] = useSearchParams();
  const { isConnected } = useWeb3();
  const [certificate, setCertificate] = useState(null);
  const [isValid, setIsValid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [showSearchForm, setShowSearchForm] = useState(true);
  const [blockchainError, setBlockchainError] = useState(null);
  const [useBlockchain, setUseBlockchain] = useState(true);

  // Mock certificate database
  const mockCertificates = [
    {
      hash: "a1b2c3d4e5f67890abcdef1234567890abcdef12",
      studentName: "John Smith",
      courseName: "Full Stack Web Development",
      issueDate: "10/15/2024",
      issuedBy: "TechSkills Academy"
    },
    {
      hash: "b2c3d4e5f67890abcdef1234567890abcdef123a",
      studentName: "Sarah Johnson",
      courseName: "Data Science Fundamentals",
      issueDate: "09/28/2024",
      issuedBy: "DataLearn Institute"
    },
    {
      hash: "c3d4e5f67890abcdef1234567890abcdef123ab2",
      studentName: "Michael Chen",
      courseName: "Cybersecurity Essentials",
      issueDate: "10/05/2024",
      issuedBy: "SecureSkills Training"
    },
    {
      hash: "d4e5f67890abcdef1234567890abcdef123ab2c3",
      studentName: "Emily Rodriguez",
      courseName: "Digital Marketing Certification",
      issueDate: "09/20/2024",
      issuedBy: "Marketing Pro Academy"
    },
    {
      hash: "e5f67890abcdef1234567890abcdef123ab2c3d4",
      studentName: "David Wilson",
      courseName: "Project Management Professional",
      issueDate: "10/12/2024",
      issuedBy: "PM Excellence Center"
    }
  ];

  const verifyCertificate = async (hashToVerify) => {
    setIsLoading(true);
    setHasSearched(true);
    setBlockchainError(null);

    try {
      if (useBlockchain && isConnected) {
        const formattedHash = formatCertificateHash(hashToVerify);
        const result = await verifyCertificateOnChain(formattedHash);

        if (result.exists) {
          const issueDate = new Date(result.issueDate * 1000).toLocaleDateString('en-US');
          setCertificate({
            hash: hashToVerify,
            studentName: result.studentName,
            courseName: result.courseName,
            issuedBy: result.issuedBy,
            issueDate: issueDate,
            issuer: result.issuer,
            onChain: true
          });
          setIsValid(result.isValid);
          setShowSearchForm(false);
        } else {
          setCertificate(null);
          setIsValid(false);
          setShowSearchForm(false);
        }
      } else {
        await new Promise(resolve => setTimeout(resolve, 1500));

        const foundCertificate = mockCertificates?.find(cert =>
          cert?.hash?.toLowerCase() === hashToVerify?.toLowerCase()
        );

        if (foundCertificate) {
          setCertificate({ ...foundCertificate, onChain: false });
          setIsValid(true);
          setShowSearchForm(false);
        } else {
          setCertificate(null);
          setIsValid(false);
          setShowSearchForm(false);
        }
      }
    } catch (error) {
      console.error('Verification failed:', error);
      setBlockchainError(error.message || 'Failed to verify certificate on blockchain');
      setCertificate(null);
      setIsValid(false);
      setShowSearchForm(false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = (hashInput) => {
    verifyCertificate(hashInput);
  };

  const handleVerifyAnother = () => {
    setCertificate(null);
    setIsValid(false);
    setHasSearched(false);
    setShowSearchForm(true);
    setBlockchainError(null);
  };

  // Check for hash in URL params or search params on component mount
  useEffect(() => {
    const hashFromUrl = hash || searchParams?.get('hash');
    if (hashFromUrl) {
      verifyCertificate(hashFromUrl);
    }
  }, [hash, searchParams]);

  return (
    <>
      <Helmet>
        <title>Certificate Verification - SkillVerify</title>
        <meta name="description" content="Verify the authenticity of digital certificates using blockchain technology and SHA-256 hash verification." />
        <meta name="keywords" content="certificate verification, blockchain, digital certificates, skill verification" />
      </Helmet>
      <div className="min-h-screen bg-background">
        <Header />
        
        <main className="pt-16">
          {/* Hero Section */}
          <section className="bg-gradient-to-br from-primary/5 to-accent/5 py-12 lg:py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center">
                <h1 className="text-3xl lg:text-4xl font-heading font-bold text-foreground mb-4">
                  Certificate Verification
                </h1>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Verify the authenticity of digital certificates using our secure blockchain-based verification system
                </p>
              </div>
            </div>
          </section>

          {/* Main Content */}
          <section className="py-12 lg:py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              {!isConnected && showSearchForm && !isLoading && (
                <div className="bg-card rounded-lg shadow-medium border border-border p-6 mb-6 max-w-2xl mx-auto">
                  <h3 className="text-lg font-semibold text-foreground mb-4">Connect Wallet for Blockchain Verification</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Connect your MetaMask wallet to verify certificates directly from the blockchain
                  </p>
                  <WalletConnectButton />
                  <div className="mt-4 pt-4 border-t border-border">
                    <label className="flex items-center space-x-2 text-sm text-muted-foreground cursor-pointer">
                      <input
                        type="checkbox"
                        checked={!useBlockchain}
                        onChange={(e) => setUseBlockchain(!e.target.checked)}
                        className="rounded border-border"
                      />
                      <span>Use mock data for testing</span>
                    </label>
                  </div>
                </div>
              )}

              {blockchainError && (
                <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4 mb-6 max-w-2xl mx-auto">
                  <p className="text-sm text-destructive">{blockchainError}</p>
                </div>
              )}

              {isLoading && (
                <div className="text-center py-12">
                  <div className="inline-flex items-center space-x-3">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                    <span className="text-lg text-muted-foreground">
                      {useBlockchain && isConnected ? 'Verifying on blockchain...' : 'Verifying certificate...'}
                    </span>
                  </div>
                </div>
              )}

              {!isLoading && showSearchForm && (
                <HashSearchForm
                  onSearch={handleSearch}
                  isLoading={isLoading}
                />
              )}

              {/* Verification Results */}
              {!isLoading && hasSearched && (
                <>
                  <VerificationCard 
                    certificate={certificate}
                    isValid={isValid}
                  />
                  
                  <VerificationActions 
                    onVerifyAnother={handleVerifyAnother}
                    showVerifyAnother={true}
                  />
                </>
              )}

              {/* Information Section - Show when no search has been made */}
              {!hasSearched && !isLoading && (
                <div className="mt-12">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                        <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                          <span className="text-white font-bold text-sm">1</span>
                        </div>
                      </div>
                      <h3 className="text-lg font-heading font-semibold text-foreground mb-2">
                        Enter Hash
                      </h3>
                      <p className="text-muted-foreground text-sm">
                        Input your certificate hash or scan the QR code from your certificate
                      </p>
                    </div>
                    
                    <div className="text-center">
                      <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                        <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                          <span className="text-white font-bold text-sm">2</span>
                        </div>
                      </div>
                      <h3 className="text-lg font-heading font-semibold text-foreground mb-2">
                        Blockchain Verification
                      </h3>
                      <p className="text-muted-foreground text-sm">
                        Our system verifies the certificate against the blockchain database
                      </p>
                    </div>
                    
                    <div className="text-center">
                      <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                        <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                          <span className="text-white font-bold text-sm">3</span>
                        </div>
                      </div>
                      <h3 className="text-lg font-heading font-semibold text-foreground mb-2">
                        Instant Results
                      </h3>
                      <p className="text-muted-foreground text-sm">
                        Get immediate verification results with detailed certificate information
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </section>
        </main>

        {/* Footer */}
        <footer className="bg-slate-900 text-white py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="md:col-span-2">
                <div className="flex items-center space-x-2 mb-4">
                  <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold">S</span>
                  </div>
                  <span className="font-heading font-semibold text-xl">SkillVerify</span>
                </div>
                <p className="text-slate-300 mb-4 max-w-md">
                  Secure, blockchain-based certificate verification system ensuring the authenticity of digital credentials.
                </p>
                <div className="flex space-x-4">
                  <div className="flex items-center space-x-2 text-sm text-slate-300">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span>SSL Secured</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-slate-300">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span>Blockchain Verified</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="font-semibold mb-4">Quick Links</h3>
                <ul className="space-y-2 text-slate-300">
                  <li><a href="/home-dashboard" className="hover:text-white transition-smooth">Dashboard</a></li>
                  <li><a href="/certificate-issuance" className="hover:text-white transition-smooth">Issue Certificate</a></li>
                  <li><a href="/certificate-verification" className="hover:text-white transition-smooth">Verify Certificate</a></li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-semibold mb-4">Support</h3>
                <ul className="space-y-2 text-slate-300">
                  <li><a href="#" className="hover:text-white transition-smooth">Help Center</a></li>
                  <li><a href="#" className="hover:text-white transition-smooth">Contact Us</a></li>
                  <li><a href="#" className="hover:text-white transition-smooth">Privacy Policy</a></li>
                </ul>
              </div>
            </div>
            
            <div className="border-t border-slate-700 mt-8 pt-8 text-center text-slate-300">
              <p>&copy; {new Date()?.getFullYear()} SkillVerify. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default CertificateVerification;