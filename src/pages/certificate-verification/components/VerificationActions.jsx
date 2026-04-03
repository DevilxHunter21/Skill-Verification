import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../../../components/ui/Button';

const VerificationActions = ({ onVerifyAnother, showVerifyAnother = true }) => {
  return (
    <div className="max-w-2xl mx-auto mt-8">
      <div className="bg-card rounded-lg shadow-medium border border-border p-6">
        <h3 className="text-lg font-heading font-semibold text-foreground mb-4 text-center">
          What would you like to do next?
        </h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {showVerifyAnother && (
            <Button
              variant="default"
              iconName="Search"
              iconPosition="left"
              onClick={onVerifyAnother}
              fullWidth
            >
              Verify Another
            </Button>
          )}
          
          <Button
            variant="outline"
            iconName="Download"
            iconPosition="left"
            onClick={() => {
              // Mock download functionality
              alert('Certificate download would start here in a real implementation');
            }}
            fullWidth
          >
            Download PDF
          </Button>
          
          <Button
            variant="outline"
            iconName="Share"
            iconPosition="left"
            onClick={() => {
              // Mock share functionality
              if (navigator.share) {
                navigator.share({
                  title: 'Certificate Verification',
                  text: 'Check out this verified certificate',
                  url: window.location?.href
                });
              } else {
                navigator.clipboard?.writeText(window.location?.href);
                alert('Verification link copied to clipboard!');
              }
            }}
            fullWidth
          >
            Share
          </Button>
        </div>
        
        <div className="mt-6 pt-4 border-t border-border text-center">
          <p className="text-sm text-muted-foreground mb-4">
            Need to issue a new certificate?
          </p>
          
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/certificate-issuance">
              <Button
                variant="secondary"
                iconName="FileText"
                iconPosition="left"
                fullWidth
              >
                Issue Certificate
              </Button>
            </Link>
            
            <Link to="/home-dashboard">
              <Button
                variant="ghost"
                iconName="Home"
                iconPosition="left"
                fullWidth
              >
                Back to Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerificationActions;