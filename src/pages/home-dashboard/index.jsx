import React from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import HeroSection from './components/HeroSection';
import FeaturesSection from './components/FeaturesSection';
import TrustSignals from './components/TrustSignals';
import SystemStatus from './components/SystemStatus';

const HomeDashboard = () => {
  return (
    <>
      <Helmet>
        <title>SkillVerify - Digital Certificate Verification System</title>
        <meta name="description" content="Secure blockchain-based certificate management with SHA-256 verification, QR codes, and instant validation for educational institutions." />
        <meta name="keywords" content="certificate verification, blockchain, digital certificates, SHA-256, QR code, education" />
      </Helmet>
      <div className="min-h-screen bg-background">
        <Header />
        
        <main className="pt-16">
          <HeroSection />
          <FeaturesSection />
          <TrustSignals />
          <SystemStatus />
        </main>

        <footer className="bg-slate-900 text-white py-12 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8">
              <div>
                <div className="flex items-center space-x-2 mb-4">
                  <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-sm">SV</span>
                  </div>
                  <span className="font-semibold text-xl">SkillVerify</span>
                </div>
                <p className="text-slate-300 text-sm leading-relaxed">
                  Secure digital certificate management system with blockchain verification 
                  and advanced security features for educational institutions.
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold mb-4">Quick Links</h3>
                <ul className="space-y-2 text-sm">
                  <li><a href="/certificate-issuance" className="text-slate-300 hover:text-white transition-smooth">Issue Certificate</a></li>
                  <li><a href="/certificate-verification" className="text-slate-300 hover:text-white transition-smooth">Verify Certificate</a></li>
                  <li><a href="/home-dashboard" className="text-slate-300 hover:text-white transition-smooth">Dashboard</a></li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-semibold mb-4">Security Features</h3>
                <ul className="space-y-2 text-sm text-slate-300">
                  <li>• SHA-256 Hash Verification</li>
                  <li>• Blockchain Technology</li>
                  <li>• SSL Encryption</li>
                  <li>• QR Code Authentication</li>
                </ul>
              </div>
            </div>
            
            <div className="border-t border-slate-700 mt-8 pt-8 text-center">
              <p className="text-slate-400 text-sm">
                © {new Date()?.getFullYear()} SkillVerify. All rights reserved. | 
                <span className="ml-2">Secure Certificate Management System</span>
              </p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default HomeDashboard;