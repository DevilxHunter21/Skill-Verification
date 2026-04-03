import { ethers } from 'ethers';
import { contractConfig } from './contractConfig';

// Initialize contract instance
export const getContract = (provider) => {
  return new ethers.Contract(
    contractConfig.address,
    contractConfig.abi,
    provider.getSigner()
  );
};

// Register a new certificate
export const registerCertificate = async (provider, name, course, hash) => {
  try {
    const contract = getContract(provider);
    const tx = await contract.registerCertificate(name, course, hash);
    await tx.wait();
    return { success: true, txHash: tx.hash };
  } catch (error) {
    console.error('Error registering certificate:', error);
    return { success: false, error: error.message };
  }
};

// Verify a certificate
export const verifyCertificate = async (provider, hash) => {
  try {
    const contract = getContract(provider);
    const result = await contract.verifyCertificate(hash);
    return {
      success: true,
      name: result[0],
      course: result[1],
      dateIssued: result[2].toString(),
    };
  } catch (error) {
    console.error('Error verifying certificate:', error);
    return { success: false, error: 'Certificate not found or error occurred' };
  }
};

// Listen for CertificateRegistered events
export const setupEventListener = (provider, callback) => {
  const contract = new ethers.Contract(
    contractConfig.address,
    contractConfig.abi,
    provider
  );
  
  contract.on('CertificateRegistered', (hash, name, course, dateIssued, event) => {
    callback({
      hash,
      name,
      course,
      dateIssued: dateIssued.toString(),
      txHash: event.transactionHash
    });
  });

  // Return cleanup function
  return () => {
    contract.removeAllListeners('CertificateRegistered');
  };
};
