import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import CertificateForm from './components/CertificateForm';
import SuccessMessage from './components/SuccessMessage';
import RecentCertificates from './components/RecentCertificates';
import LoadingState from './components/LoadingState';
import Icon from '../../components/AppIcon';
import WalletConnectButton from '../../components/ui/WalletConnectButton';
import { useWeb3 } from '../../contexts/Web3Context';
import { 
  issueCertificateOnChain, 
  verifyCertificateOnChain,
  formatCertificateHash,
  parseCertificateHash
} from '../../services/blockchainService';

const CertificateIssuance = () => {
  const navigate = useNavigate();
  const { isConnected } = useWeb3();
  const [isLoading, setIsLoading] = useState(false);
  const [loadingStage, setLoadingStage] = useState('validating');
  const [generatedCertificate, setGeneratedCertificate] = useState(null);
  const [recentCertificates, setRecentCertificates] = useState([]);
  const [blockchainError, setBlockchainError] = useState(null);

  // Load recent certificates from local storage on component mount
  useEffect(() => {
    const loadRecentCertificates = () => {
      try {
        const savedCertificates = localStorage.getItem('recentCertificates');
        if (savedCertificates) {
          setRecentCertificates(JSON.parse(savedCertificates));
        }
      } catch (error) {
        console.error('Error loading recent certificates:', error);
      }
    };
    
    loadRecentCertificates();
  }, []);

  // Save recent certificates to local storage when updated
  const updateRecentCertificates = useCallback((newCertificate) => {
    setRecentCertificates(prevCertificates => {
      const updatedCertificates = [
        {
          hash: newCertificate.certificateHash,
          studentName: newCertificate.studentName,
          courseName: newCertificate.courseName,
          issueDate: new Date(parseInt(newCertificate.timestamp) * 1000).toLocaleDateString(),
          txHash: newCertificate.txHash
        },
        ...prevCertificates
      ].slice(0, 5); // Keep only the 5 most recent
      
      localStorage.setItem('recentCertificates', JSON.stringify(updatedCertificates));
      return updatedCertificates;
    });
  }, []);

  // Handle form submission
  const handleFormSubmit = async (formData) => {
    if (!isConnected) {
      setBlockchainError('Please connect your wallet to issue a certificate');
      return;
    }

    setIsLoading(true);
    setBlockchainError(null);
    
    try {
      setLoadingStage('issuing');
      
      // Issue certificate on the blockchain
      const result = await issueCertificateOnChain(
        formData.studentName,
        formData.courseName
      );

      if (!result.success) {
        throw new Error(result.error || 'Failed to issue certificate');
      }

      // Create certificate object
      const certificate = {
        certificateHash: result.certificateHash,
        studentName: formData.studentName,
        courseName: formData.courseName,
        timestamp: result.timestamp,
        txHash: result.txHash,
        blockNumber: result.blockNumber
      };

      // Update recent certificates
      updateRecentCertificates(certificate);
      
      // Set the generated certificate for display
      setGeneratedCertificate({
        ...certificate,
        issueDate: new Date(parseInt(certificate.timestamp) * 1000).toLocaleDateString()
      });
      
    } catch (error) {
      console.error('Error issuing certificate:', error);
      setBlockchainError(error.message || 'Failed to issue certificate');
    } finally {
      setIsLoading(false);
    }
  };

  // Verify a certificate
  const handleVerifyCertificate = async (hash) => {
    try {
      setIsLoading(true);
      setLoadingStage('verifying');
      
      const result = await verifyCertificateOnChain(formatCertificateHash(hash));
      
      if (!result.exists) {
        throw new Error('Certificate not found on the blockchain');
      }
      
      // Navigate to verification page with the result
      navigate(`/certificate-verification?hash=${hash}`, { state: { verificationResult: result } });
      
    } catch (error) {
      console.error('Error verifying certificate:', error);
      setBlockchainError(error.message || 'Failed to verify certificate');
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setGeneratedCertificate(null);
    setIsLoading(false);
    setBlockchainError(null);
  };

  const handleViewCertificate = (certificate) => {
    navigate(`/certificate-verification?hash=${certificate.hash}`);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Page Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Certificate Issuance System
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Create verifiable digital certificates with blockchain security and automated PDF generation
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content Area */}
            <div className="lg:col-span-2">
              {!isConnected && !isLoading && !generatedCertificate && (
                <div className="bg-card rounded-lg shadow-medium border border-border p-6 mb-6">
                  <h3 className="text-lg font-semibold text-foreground mb-4">Connect Wallet</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Connect your MetaMask wallet to issue certificates on the blockchain
                  </p>
                  <WalletConnectButton />
                </div>
              )}

              {blockchainError && (
                <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4 mb-6">
                  <p className="text-sm text-destructive">{blockchainError}</p>
                </div>
              )}

              {isLoading ? (
                <LoadingState stage={loadingStage} />
              ) : generatedCertificate ? (
                <SuccessMessage
                  certificate={generatedCertificate}
                  onReset={handleReset}
                  onVerify={handleVerifyCertificate}
                />
              ) : (
                <CertificateForm
                  onSubmit={handleFormSubmit}
                  isLoading={isLoading}
                />
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <RecentCertificates
                certificates={recentCertificates}
                onViewCertificate={handleViewCertificate}
              />

              {/* System Status Card */}
              <div className="mt-6 bg-card rounded-lg shadow-medium border border-border p-6">
                <h3 className="text-lg font-semibold text-foreground mb-4">System Status</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Database Connection</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-success rounded-full"></div>
                      <span className="text-sm font-medium text-success">Online</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Hash Generation</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-success rounded-full"></div>
                      <span className="text-sm font-medium text-success">Active</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">PDF Service</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-success rounded-full"></div>
                      <span className="text-sm font-medium text-success">Ready</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="mt-6 bg-card rounded-lg shadow-medium border border-border p-6">
                <h3 className="text-lg font-semibold text-foreground mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <button
                    onClick={() => navigate('/certificate-verification')}
                    className="w-full flex items-center space-x-3 p-3 text-left bg-muted/30 hover:bg-muted/50 rounded-lg transition-smooth"
                  >
                    <Icon name="Shield" size={20} color="var(--color-primary)" />
                    <span className="text-sm font-medium text-foreground">Verify Certificate</span>
                  </button>
                  <button
                    onClick={() => navigate('/home-dashboard')}
                    className="w-full flex items-center space-x-3 p-3 text-left bg-muted/30 hover:bg-muted/50 rounded-lg transition-smooth"
                  >
                    <Icon name="Home" size={20} color="var(--color-primary)" />
                    <span className="text-sm font-medium text-foreground">Dashboard</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CertificateIssuance;