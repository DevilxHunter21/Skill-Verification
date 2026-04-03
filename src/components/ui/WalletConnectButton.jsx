import React from 'react';
import { useWeb3 } from '../../contexts/Web3Context';
import Button from './Button';

const WalletConnectButton = ({ className = '' }) => {
  const { account, isConnected, isLoading, error, connectWallet, disconnectWallet, isMetaMaskInstalled } = useWeb3();

  const formatAddress = (address) => {
    if (!address) return '';
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  };

  if (!isMetaMaskInstalled) {
    return (
      <div className={`text-center ${className}`}>
        <p className="text-sm text-muted-foreground mb-3">
          MetaMask is required to use blockchain features
        </p>
        <Button
          as="a"
          href="https://metamask.io/download/"
          target="_blank"
          rel="noopener noreferrer"
          variant="primary"
        >
          Install MetaMask
        </Button>
      </div>
    );
  }

  return (
    <div className={className}>
      {error && (
        <div className="mb-4 p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
          <p className="text-sm text-destructive">{error}</p>
        </div>
      )}

      {isConnected ? (
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <div className="w-2 h-2 bg-success rounded-full"></div>
            <div>
              <p className="text-sm font-medium text-foreground">Connected</p>
              <p className="text-xs text-muted-foreground">{formatAddress(account)}</p>
            </div>
          </div>
          <Button
            onClick={disconnectWallet}
            variant="outline"
            size="sm"
          >
            Disconnect
          </Button>
        </div>
      ) : (
        <Button
          onClick={connectWallet}
          isLoading={isLoading}
          variant="primary"
          className="w-full"
        >
          {isLoading ? 'Connecting...' : 'Connect Wallet'}
        </Button>
      )}
    </div>
  );
};

export default WalletConnectButton;
