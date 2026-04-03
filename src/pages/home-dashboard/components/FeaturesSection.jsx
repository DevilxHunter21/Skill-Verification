import React from 'react';
import FeatureCard from './FeatureCard';

const FeaturesSection = () => {
  const features = [
    {
      icon: "FileText",
      title: "Certificate Issuance",
      description: "Generate secure digital certificates with SHA-256 hash verification and automatic PDF creation with embedded QR codes for instant validation.",
      highlight: true
    },
    {
      icon: "QrCode",
      title: "QR Code Generation",
      description: "Each certificate includes a unique QR code linking directly to verification pages, enabling quick mobile scanning and instant authenticity checks.",
      highlight: false
    },
    {
      icon: "Shield",
      title: "Blockchain Verification",
      description: "Tamper-proof certificate validation using blockchain technology with hash-based URLs ensuring permanent record integrity and trust.",
      highlight: false
    }
  ];

  return (
    <section className="py-20 px-4 bg-background">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
            Powerful Certificate Management
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Comprehensive digital certificate solution with advanced security features 
            and seamless verification capabilities for modern educational institutions.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {features?.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature?.icon}
              title={feature?.title}
              description={feature?.description}
              highlight={feature?.highlight}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;