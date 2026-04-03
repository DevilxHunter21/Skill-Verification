import React from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const SuccessMessage = ({ certificate, onReset, onVerify }) => {
  const verificationUrl = `${window.location?.origin}/certificate-verification?hash=${certificate?.hash}`;

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard?.writeText(verificationUrl);
      // You could add a toast notification here
    } catch (err) {
      console.error('Failed to copy URL:', err);
    }
  };

  return (
    <div className="bg-card rounded-lg shadow-medium border border-border p-6 lg:p-8">
      <div className="text-center mb-6">
        <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <Icon name="CheckCircle" size={32} color="var(--color-success)" />
        </div>
        <h2 className="text-2xl font-semibold text-foreground mb-2">Certificate Generated Successfully!</h2>
        <p className="text-muted-foreground">Your digital certificate has been created and is ready for download</p>
      </div>
      <div className="space-y-6">
        {/* Certificate Details */}
        <div className="bg-muted/50 rounded-lg p-4">
          <h3 className="font-semibold text-foreground mb-3">Certificate Details</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Student Name:</span>
              <span className="font-medium text-foreground">{certificate?.studentName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Course:</span>
              <span className="font-medium text-foreground">{certificate?.courseName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Issue Date:</span>
              <span className="font-medium text-foreground">{certificate?.issueDate}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Certificate Hash:</span>
              <div className="flex items-center space-x-2">
                <code className="bg-background px-2 py-1 rounded text-xs font-mono text-primary">
                  {certificate?.hash?.substring(0, 16)}...
                </code>
                <Button
                  variant="ghost"
                  size="xs"
                  iconName="Copy"
                  onClick={copyToClipboard}
                />
              </div>
            </div>
          </div>
        </div>

        {/* QR Code Display */}
        <div className="text-center">
          <h3 className="font-semibold text-foreground mb-3">Verification QR Code</h3>
          <div className="inline-block p-4 bg-white rounded-lg border border-border">
            <div className="w-32 h-32 bg-muted flex items-center justify-center rounded">
              <Icon name="QrCode" size={64} color="var(--color-muted-foreground)" />
            </div>
          </div>
          <p className="text-xs text-muted-foreground mt-2">Scan to verify certificate authenticity</p>
        </div>

        {/* Verification URL */}
        <div className="bg-background rounded-lg p-4 border border-border">
          <label className="block text-sm font-medium text-foreground mb-2">Verification URL:</label>
          <div className="flex items-center space-x-2">
            <input
              type="text"
              value={verificationUrl}
              readOnly
              className="flex-1 px-3 py-2 text-xs bg-muted border border-border rounded-md font-mono text-muted-foreground"
            />
            <Button
              variant="outline"
              size="sm"
              iconName="Copy"
              onClick={copyToClipboard}
            >
              Copy
            </Button>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            variant="default"
            size="lg"
            fullWidth
            iconName="Download"
            iconPosition="left"
            onClick={() => {
              // Simulate PDF download
              const link = document.createElement('a');
              link.href = '#';
              link.download = `certificate-${certificate?.hash?.substring(0, 8)}.pdf`;
              link?.click();
            }}
          >
            Download Certificate PDF
          </Button>
          <Button
            variant="outline"
            size="lg"
            fullWidth
            iconName="Shield"
            iconPosition="left"
            onClick={onVerify}
          >
            Verify Certificate
          </Button>
        </div>

        <div className="text-center">
          <Button
            variant="ghost"
            size="sm"
            iconName="Plus"
            iconPosition="left"
            onClick={onReset}
          >
            Issue Another Certificate
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SuccessMessage;