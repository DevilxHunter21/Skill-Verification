import { ethers } from 'ethers';

let provider = null;
let signer = null;

export const initWeb3Provider = async () => {
  if (typeof window.ethereum !== 'undefined') {
    try {
      provider = new ethers.BrowserProvider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      signer = await provider.getSigner();
      return { provider, signer };
    } catch (error) {
      console.error('Failed to initialize Web3 provider:', error);
      throw error;
    }
  } else {
    throw new Error('MetaMask is not installed. Please install MetaMask to use blockchain features.');
  }
};

export const getProvider = () => {
  if (!provider) {
    throw new Error('Provider not initialized. Call initWeb3Provider first.');
  }
  return provider;
};

export const getSigner = () => {
  if (!signer) {
    throw new Error('Signer not initialized. Call initWeb3Provider first.');
  }
  return signer;
};

export const getCurrentAccount = async () => {
  try {
    if (!signer) {
      await initWeb3Provider();
    }
    return await signer.getAddress();
  } catch (error) {
    console.error('Failed to get current account:', error);
    throw error;
  }
};

export const getNetwork = async () => {
  try {
    if (!provider) {
      await initWeb3Provider();
    }
    return await provider.getNetwork();
  } catch (error) {
    console.error('Failed to get network:', error);
    throw error;
  }
};

export const switchNetwork = async (chainId) => {
  try {
    await window.ethereum.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: `0x${chainId.toString(16)}` }],
    });
  } catch (error) {
    if (error.code === 4902) {
      throw new Error('Network not added to MetaMask');
    }
    throw error;
  }
};

export const isMetaMaskInstalled = () => {
  return typeof window.ethereum !== 'undefined';
};
