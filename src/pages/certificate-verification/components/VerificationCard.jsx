import React from 'react';
import Icon from '../../../components/AppIcon';

const VerificationCard = ({ certificate, isValid }) => {
  if (!isValid) {
    return (
      <div className="bg-card rounded-lg shadow-medium border border-border p-8 text-center max-w-2xl mx-auto">
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
            <Icon name="AlertCircle" size={32} color="#dc2626" />
          </div>
        </div>
        
        <h2 className="text-2xl font-heading font-semibold text-red-600 mb-4">
          Certificate Not Found
        </h2>
        
        <p className="text-muted-foreground mb-6 leading-relaxed">
          The certificate you're looking for could not be found. This may be due to:
        </p>
        
        <ul className="text-left text-muted-foreground mb-8 space-y-2 max-w-md mx-auto">
          <li className="flex items-start space-x-2">
            <Icon name="Dot" size={16} className="mt-1 text-red-500" />
            <span>Invalid or expired certificate hash</span>
          </li>
          <li className="flex items-start space-x-2">
            <Icon name="Dot" size={16} className="mt-1 text-red-500" />
            <span>Certificate has been revoked</span>
          </li>
          <li className="flex items-start space-x-2">
            <Icon name="Dot" size={16} className="mt-1 text-red-500" />
            <span>Incorrect verification URL</span>
          </li>
        </ul>
        
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-sm text-red-700">
            Please verify the QR code or hash and try again. Contact the issuing organization if you believe this is an error.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card rounded-lg shadow-medium border border-border p-8 max-w-2xl mx-auto">
      {/* Success Header */}
      <div className="text-center mb-8">
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
            <Icon name="CheckCircle" size={32} color="#059669" />
          </div>
        </div>
        
        <h2 className="text-2xl font-heading font-semibold text-green-600 mb-2">
          Certificate Valid
        </h2>
        
        <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
          <Icon name="Shield" size={16} color="#059669" />
          <span>Blockchain Verified</span>
          <Icon name="Lock" size={16} color="#059669" />
          <span>Secure Hash</span>
        </div>
      </div>
      {/* Certificate Details */}
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-1">
                Student Name
              </label>
              <p className="text-lg font-semibold text-foreground">
                {certificate?.studentName}
              </p>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-1">
                Course Name
              </label>
              <p className="text-lg font-semibold text-foreground">
                {certificate?.courseName}
              </p>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-1">
                Issue Date
              </label>
              <p className="text-lg font-semibold text-foreground">
                {certificate?.issueDate}
              </p>
            </div>
          </div>
          
          {/* QR Code Section */}
          <div className="flex flex-col items-center justify-center bg-muted rounded-lg p-6">
            <div className="w-32 h-32 bg-white rounded-lg flex items-center justify-center mb-3 border">
              <div className="w-28 h-28 bg-gray-200 rounded flex items-center justify-center">
                <Icon name="QrCode" size={48} color="#64748b" />
              </div>
            </div>
            <p className="text-xs text-muted-foreground text-center">
              Scan to verify certificate
            </p>
          </div>
        </div>
        
        {/* Certificate Hash */}
        <div className="bg-muted rounded-lg p-4">
          <label className="block text-sm font-medium text-muted-foreground mb-2">
            Certificate Hash
          </label>
          <div className="flex items-center space-x-2">
            <code className="flex-1 text-sm font-mono bg-background px-3 py-2 rounded border break-all">
              {certificate?.hash}
            </code>
            <button 
              className="p-2 hover:bg-background rounded transition-smooth"
              title="Copy hash"
            >
              <Icon name="Copy" size={16} />
            </button>
          </div>
        </div>
        
        {/* Trust Indicators */}
        <div className="flex flex-wrap gap-4 justify-center pt-4 border-t border-border">
          <div className="flex items-center space-x-2 text-sm text-green-600">
            <Icon name="Shield" size={16} />
            <span>SSL Secured</span>
          </div>
          <div className="flex items-center space-x-2 text-sm text-green-600">
            <Icon name="Database" size={16} />
            <span>Blockchain Verified</span>
          </div>
          <div className="flex items-center space-x-2 text-sm text-green-600">
            <Icon name="Clock" size={16} />
            <span>Real-time Validation</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerificationCard;