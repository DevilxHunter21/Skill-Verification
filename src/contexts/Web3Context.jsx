import React, { createContext, useContext, useState, useEffect } from 'react';
import { initWeb3Provider, getCurrentAccount, getNetwork, isMetaMaskInstalled } from '../utils/web3Provider';

const Web3Context = createContext(null);

export const useWeb3 = () => {
  const context = useContext(Web3Context);
  if (!context) {
    throw new Error('useWeb3 must be used within a Web3Provider');
  }
  return context;
};

export const Web3Provider = ({ children }) => {
  const [account, setAccount] = useState(null);
  const [network, setNetwork] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const connectWallet = async () => {
    if (!isMetaMaskInstalled()) {
      setError('MetaMask is not installed. Please install MetaMask to use blockchain features.');
      return false;
    }

    setIsLoading(true);
    setError(null);

    try {
      await initWeb3Provider();
      const currentAccount = await getCurrentAccount();
      const currentNetwork = await getNetwork();

      setAccount(currentAccount);
      setNetwork({
        chainId: Number(currentNetwork.chainId),
        name: currentNetwork.name
      });
      setIsConnected(true);
      setIsLoading(false);
      return true;
    } catch (err) {
      console.error('Failed to connect wallet:', err);
      setError(err.message || 'Failed to connect wallet');
      setIsLoading(false);
      return false;
    }
  };

  const disconnectWallet = () => {
    setAccount(null);
    setNetwork(null);
    setIsConnected(false);
    setError(null);
  };

  useEffect(() => {
    if (isMetaMaskInstalled()) {
      window.ethereum.on('accountsChanged', (accounts) => {
        if (accounts.length === 0) {
          disconnectWallet();
        } else {
          setAccount(accounts[0]);
        }
      });

      window.ethereum.on('chainChanged', () => {
        window.location.reload();
      });
    }

    return () => {
      if (isMetaMaskInstalled()) {
        window.ethereum.removeAllListeners('accountsChanged');
        window.ethereum.removeAllListeners('chainChanged');
      }
    };
  }, []);

  const value = {
    account,
    network,
    isConnected,
    isLoading,
    error,
    connectWallet,
    disconnectWallet,
    isMetaMaskInstalled: isMetaMaskInstalled()
  };

  return <Web3Context.Provider value={value}>{children}</Web3Context.Provider>;
};
