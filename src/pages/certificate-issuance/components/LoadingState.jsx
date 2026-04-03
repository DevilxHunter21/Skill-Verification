import React from 'react';
import Icon from '../../../components/AppIcon';

const LoadingState = ({ stage }) => {
  const stages = [
    { id: 'validating', label: 'Validating Information', icon: 'CheckCircle2' },
    { id: 'generating', label: 'Generating SHA-256 Hash', icon: 'Hash' },
    { id: 'blockchain', label: 'Recording on Blockchain', icon: 'Link' },
    { id: 'qr', label: 'Generating QR Code', icon: 'QrCode' },
    { id: 'finalizing', label: 'Finalizing Certificate', icon: 'Award' }
  ];

  const currentStageIndex = stages?.findIndex(s => s?.id === stage);

  return (
    <div className="bg-card rounded-lg shadow-medium border border-border p-6 lg:p-8">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <div className="animate-spin">
            <Icon name="Loader2" size={32} color="var(--color-primary)" />
          </div>
        </div>
        <h2 className="text-2xl font-semibold text-foreground mb-2">Generating Certificate</h2>
        <p className="text-muted-foreground">Please wait while we create your digital certificate</p>
      </div>
      <div className="space-y-4">
        {stages?.map((stageItem, index) => {
          const isCompleted = index < currentStageIndex;
          const isCurrent = index === currentStageIndex;
          const isPending = index > currentStageIndex;

          return (
            <div
              key={stageItem?.id}
              className={`flex items-center space-x-4 p-4 rounded-lg transition-smooth ${
                isCompleted
                  ? 'bg-success/10 border border-success/20'
                  : isCurrent
                  ? 'bg-primary/10 border border-primary/20' :'bg-muted/30 border border-border'
              }`}
            >
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  isCompleted
                    ? 'bg-success text-white'
                    : isCurrent
                    ? 'bg-primary text-white' :'bg-muted text-muted-foreground'
                }`}
              >
                {isCompleted ? (
                  <Icon name="Check" size={20} />
                ) : isCurrent ? (
                  <div className="animate-spin">
                    <Icon name="Loader2" size={20} />
                  </div>
                ) : (
                  <Icon name={stageItem?.icon} size={20} />
                )}
              </div>
              <div className="flex-1">
                <p
                  className={`font-medium ${
                    isCompleted
                      ? 'text-success'
                      : isCurrent
                      ? 'text-primary' :'text-muted-foreground'
                  }`}
                >
                  {stageItem?.label}
                </p>
                {isCurrent && (
                  <p className="text-sm text-muted-foreground mt-1">Processing...</p>
                )}
                {isCompleted && (
                  <p className="text-sm text-success/80 mt-1">Completed</p>
                )}
              </div>
              {isCompleted && (
                <Icon name="CheckCircle" size={20} color="var(--color-success)" />
              )}
            </div>
          );
        })}
      </div>
      <div className="mt-6 p-4 bg-muted/50 rounded-lg">
        <div className="flex items-center space-x-3">
          <Icon name="Clock" size={20} color="var(--color-muted-foreground)" />
          <p className="text-sm text-muted-foreground">
            Certificate generation typically takes 10-15 seconds. Please do not close this window.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoadingState;