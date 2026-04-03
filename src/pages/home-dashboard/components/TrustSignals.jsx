import React from 'react';
import Icon from '../../../components/AppIcon';

const TrustSignals = () => {
  const trustIndicators = [
    {
      icon: "Lock",
      title: "SSL Encrypted",
      description: "256-bit SSL encryption protects all data transmission"
    },
    {
      icon: "Database",
      title: "Secure Storage",
      description: "MySQL database with encrypted certificate records"
    },
    {
      icon: "CheckCircle",
      title: "Verified System",
      description: "Blockchain-based verification ensures authenticity"
    },
    {
      icon: "Globe",
      title: "Global Access",
      description: "24/7 certificate verification from anywhere"
    }
  ];

  return (
    <section className="py-16 px-4 bg-muted/30">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
            Trusted by Educational Institutions
          </h2>
          <p className="text-muted-foreground">
            Enterprise-grade security and reliability you can depend on
          </p>
        </div>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {trustIndicators?.map((indicator, index) => (
            <div 
              key={index}
              className="bg-card rounded-lg p-6 text-center shadow-subtle border border-border"
            >
              <div className="w-12 h-12 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon 
                  name={indicator?.icon} 
                  size={24} 
                  color="var(--color-success)" 
                />
              </div>
              <h3 className="font-semibold text-foreground mb-2">
                {indicator?.title}
              </h3>
              <p className="text-sm text-muted-foreground">
                {indicator?.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustSignals;