import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const SystemStatus = () => {
  const [connectionStatus, setConnectionStatus] = useState('connected');
  const [lastUpdated, setLastUpdated] = useState(new Date());

  useEffect(() => {
    // Simulate database connection check
    const checkConnection = () => {
      // Mock connection status - in real app this would be an API call
      const isConnected = Math.random() > 0.1; // 90% success rate
      setConnectionStatus(isConnected ? 'connected' : 'disconnected');
      setLastUpdated(new Date());
    };

    checkConnection();
    const interval = setInterval(checkConnection, 30000); // Check every 30 seconds

    return () => clearInterval(interval);
  }, []);

  const getStatusColor = () => {
    switch (connectionStatus) {
      case 'connected':
        return 'text-success';
      case 'disconnected':
        return 'text-error';
      default:
        return 'text-warning';
    }
  };

  const getStatusIcon = () => {
    switch (connectionStatus) {
      case 'connected':
        return 'CheckCircle';
      case 'disconnected':
        return 'XCircle';
      default:
        return 'AlertCircle';
    }
  };

  return (
    <section className="py-8 px-4 bg-card border-t border-border">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row items-center justify-between">
          <div className="flex items-center space-x-3 mb-4 sm:mb-0">
            <Icon 
              name={getStatusIcon()} 
              size={20} 
              className={getStatusColor()}
            />
            <span className="text-sm font-medium text-foreground">
              Database Status: 
              <span className={`ml-1 capitalize ${getStatusColor()}`}>
                {connectionStatus}
              </span>
            </span>
          </div>
          
          <div className="text-sm text-muted-foreground">
            Last updated: {lastUpdated?.toLocaleTimeString('en-US', {
              hour: '2-digit',
              minute: '2-digit',
              second: '2-digit'
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SystemStatus;