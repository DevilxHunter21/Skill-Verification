import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Icon from '../../../components/AppIcon';

const HashSearchForm = ({ onSearch, isLoading }) => {
  const [hashInput, setHashInput] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e?.preventDefault();
    setError('');
    
    if (!hashInput?.trim()) {
      setError('Please enter a certificate hash');
      return;
    }
    
    if (hashInput?.length < 10) {
      setError('Certificate hash must be at least 10 characters');
      return;
    }
    
    onSearch(hashInput?.trim());
  };

  const handleInputChange = (e) => {
    setHashInput(e?.target?.value);
    if (error) setError('');
  };

  return (
    <div className="bg-card rounded-lg shadow-medium border border-border p-6 max-w-2xl mx-auto mb-8">
      <div className="text-center mb-6">
        <h3 className="text-lg font-heading font-semibold text-foreground mb-2">
          Verify Certificate by Hash
        </h3>
        <p className="text-muted-foreground">
          Enter the certificate hash to verify its authenticity
        </p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Certificate Hash"
          type="text"
          placeholder="Enter certificate hash (e.g., a1b2c3d4e5f6...)"
          value={hashInput}
          onChange={handleInputChange}
          error={error}
          disabled={isLoading}
          className="font-mono"
        />
        
        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            type="submit"
            variant="default"
            loading={isLoading}
            iconName="Search"
            iconPosition="left"
            className="flex-1"
          >
            Verify Certificate
          </Button>
          
          <Button
            type="button"
            variant="outline"
            iconName="QrCode"
            iconPosition="left"
            onClick={() => {
              // Mock QR scanner functionality
              alert('QR Scanner would open here in a real implementation');
            }}
          >
            Scan QR Code
          </Button>
        </div>
      </form>
      
      <div className="mt-6 pt-4 border-t border-border">
        <div className="flex items-start space-x-3 text-sm text-muted-foreground">
          <Icon name="Info" size={16} className="mt-0.5 text-blue-500" />
          <div>
            <p className="mb-1">
              <strong>How to find your certificate hash:</strong>
            </p>
            <ul className="space-y-1 text-xs">
              <li>• Check your certificate PDF for the hash code</li>
              <li>• Scan the QR code on your certificate</li>
              <li>• Use the verification link provided by your institution</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HashSearchForm;