import React from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const RecentCertificates = ({ certificates, onViewCertificate }) => {
  if (!certificates || certificates?.length === 0) {
    return (
      <div className="bg-card rounded-lg shadow-medium border border-border p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Recent Certificates</h3>
        <div className="text-center py-8">
          <Icon name="FileText" size={48} color="var(--color-muted-foreground)" className="mx-auto mb-4" />
          <p className="text-muted-foreground">No certificates issued yet</p>
          <p className="text-sm text-muted-foreground mt-1">Generated certificates will appear here</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card rounded-lg shadow-medium border border-border p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground">Recent Certificates</h3>
        <Button variant="ghost" size="sm" iconName="RefreshCw">
          Refresh
        </Button>
      </div>
      <div className="space-y-3">
        {certificates?.map((cert, index) => (
          <div
            key={cert?.hash}
            className="flex items-center justify-between p-4 bg-muted/30 rounded-lg border border-border hover:bg-muted/50 transition-smooth"
          >
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <Icon name="Award" size={20} color="var(--color-primary)" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-foreground truncate">{cert?.studentName}</h4>
                  <p className="text-sm text-muted-foreground truncate">{cert?.courseName}</p>
                  <div className="flex items-center space-x-4 mt-1">
                    <span className="text-xs text-muted-foreground">{cert?.issueDate}</span>
                    <code className="text-xs bg-background px-2 py-1 rounded font-mono text-primary">
                      {cert?.hash?.substring(0, 8)}...
                    </code>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-2 ml-4">
              <Button
                variant="ghost"
                size="sm"
                iconName="Eye"
                onClick={() => onViewCertificate(cert)}
              >
                View
              </Button>
              <Button
                variant="ghost"
                size="sm"
                iconName="Download"
                onClick={() => {
                  // Simulate PDF download
                  const link = document.createElement('a');
                  link.href = '#';
                  link.download = `certificate-${cert?.hash?.substring(0, 8)}.pdf`;
                  link?.click();
                }}
              >
                Download
              </Button>
            </div>
          </div>
        ))}
      </div>
      {certificates?.length >= 5 && (
        <div className="text-center mt-4">
          <Button variant="outline" size="sm" iconName="MoreHorizontal">
            View All Certificates
          </Button>
        </div>
      )}
    </div>
  );
};

export default RecentCertificates;