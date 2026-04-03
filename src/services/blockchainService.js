import { ethers } from 'ethers';
import { contractConfig } from '../contractConfig';
import { getSigner, getProvider } from '../utils/web3Provider';

/**
 * Get contract instance
 * @param {boolean} readOnly - Whether to use a read-only provider
 * @returns {Promise<ethers.Contract>} Contract instance
 */
export const getContract = async (readOnly = false) => {
  if (readOnly) {
    const provider = getProvider();
    return new ethers.Contract(contractConfig.address, contractConfig.abi, provider);
  } else {
    const signer = getSigner();
    return new ethers.Contract(contractConfig.address, contractConfig.abi, signer);
  }
};

/**
 * Generate a certificate hash
 * @param {string} studentName - Student's name
 * @param {string} courseName - Course name
 * @param {number} timestamp - Timestamp
 * @returns {string} Generated hash
 */
export const generateCertificateHash = (studentName, courseName, timestamp) => {
  const data = `${studentName}-${courseName}-${timestamp}`;
  return ethers.keccak256(ethers.toUtf8Bytes(data));
};

/**
 * Format timestamp to human-readable date
 * @param {number|string} timestamp - Unix timestamp
 * @returns {string} Formatted date string
 */
const formatDate = (timestamp) => {
  return new Date(Number(timestamp) * 1000).toLocaleDateString();
};

/**
 * Issue a new certificate on the blockchain
 * @param {string} studentName - Student's name
 * @param {string} courseName - Course name
 * @returns {Promise<Object>} Transaction result
 */
export const issueCertificateOnChain = async (studentName, courseName) => {
  try {
    const timestamp = Math.floor(Date.now() / 1000);
    const hash = generateCertificateHash(studentName, courseName, timestamp);
    const certificateHash = ethers.hexlify(hash);

    const contract = await getContract(false);
    const tx = await contract.registerCertificate(
      studentName,
      courseName,
      certificateHash
    );
    
    const receipt = await tx.wait();
    
    return {
      success: true,
      txHash: tx.hash,
      certificateHash,
      timestamp,
      blockNumber: receipt.blockNumber
    };
  } catch (error) {
    console.error('Error issuing certificate on chain:', error);
    return { 
      success: false, 
      error: error.message.includes('user rejected transaction') 
        ? 'Transaction was rejected by user' 
        : 'Failed to issue certificate on chain' 
    };
  }
};

/**
 * Verify a certificate on the blockchain
 * @param {string} certificateHash - Certificate hash to verify
 * @returns {Promise<Object>} Verification result
 */
export const verifyCertificateOnChain = async (certificateHash) => {
  try {
    const contract = await getContract(true);
    const result = await contract.verifyCertificate(certificateHash);
    
    // Check if the certificate exists (first return value is non-empty name)
    if (!result || !result[0]) {
      return { 
        exists: false, 
        isValid: false,
        error: 'Certificate not found'
      };
    }

    return {
      exists: true,
      isValid: true, // Our contract doesn't have an invalid state
      studentName: result[0],
      courseName: result[1],
      issueDate: formatDate(result[2]),
      timestamp: result[2].toString()
    };
  } catch (error) {
    console.error('Error verifying certificate on blockchain:', error);
    return { 
      exists: false, 
      isValid: false, 
      error: error.message.includes('Certificate not found') 
        ? 'Certificate not found' 
        : 'Error verifying certificate'
    };
  }
};

/**
 * Format a certificate hash by ensuring it has the 0x prefix
 * @param {string} hash - The certificate hash
 * @returns {string} Formatted hash with 0x prefix
 */
export const formatCertificateHash = (hash) => {
  if (!hash) return '';
  return hash.startsWith('0x') ? hash : `0x${hash}`;
};

/**
 * Parse a certificate hash by removing the 0x prefix if present
 * @param {string} hash - The certificate hash
 * @returns {string} Hash without 0x prefix
 */
export const parseCertificateHash = (hash) => {
  if (!hash) return '';
  return hash.startsWith('0x') ? hash.slice(2) : hash;
};
