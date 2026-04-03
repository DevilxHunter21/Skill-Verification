import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const HeroSection = () => {
  return (
    <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-20 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <div className="mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-primary rounded-full mb-6 shadow-elevated">
            <Icon name="Shield" size={40} color="white" />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
            Digital Certificate
            <span className="block text-primary">Verification System</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            Secure, blockchain-based certificate management with SHA-256 hash verification, 
            QR code generation, and instant validation for educational institutions and training organizations.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link to="/certificate-issuance">
            <Button 
              variant="default" 
              size="lg" 
              iconName="FileText" 
              iconPosition="left"
              className="w-full sm:w-auto"
            >
              Issue Certificate
            </Button>
          </Link>
          <Link to="/certificate-verification">
            <Button 
              variant="outline" 
              size="lg" 
              iconName="Search" 
              iconPosition="left"
              className="w-full sm:w-auto"
            >
              Verify Certificate
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;