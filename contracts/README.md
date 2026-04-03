# Certificate Verification Smart Contract

This directory contains the Solidity smart contract for blockchain-based certificate verification.

## Contract: CertificateVerification.sol

The smart contract provides secure, immutable storage for educational certificates on the Ethereum blockchain.

### Key Features

- Issue certificates with unique hashes
- Verify certificate authenticity
- Revoke certificates when necessary
- Authorize and manage certificate issuers
- Track all certificates issued by each issuer

### Main Functions

#### issueCertificate
Issues a new certificate on the blockchain.

Parameters:
- `_studentName`: Name of the student
- `_courseName`: Name of the course
- `_issuedBy`: Organization issuing the certificate
- `_certificateHash`: Unique hash identifying the certificate

Returns the certificate hash.

#### verifyCertificate
Verifies a certificate exists and returns its details.

Parameters:
- `_certificateHash`: Hash of the certificate to verify

Returns certificate information including validity status.

#### revokeCertificate
Revokes a certificate (only by issuer or owner).

Parameters:
- `_certificateHash`: Hash of the certificate to revoke

### Deployment Steps

1. Install dependencies:
   ```bash
   npm install --save-dev hardhat @nomicfoundation/hardhat-toolbox
   ```

2. Initialize Hardhat:
   ```bash
   npx hardhat init
   ```

3. Update hardhat.config.js with your network settings

4. Deploy the contract:
   ```bash
   npx hardhat run scripts/deploy.js --network <network-name>
   ```

5. Add the deployed contract address to your .env file:
   ```
   VITE_CONTRACT_ADDRESS=0x...
   ```

### Security Considerations

- Only authorized issuers can create certificates
- Certificates are immutable once created
- Only the issuer or contract owner can revoke certificates
- All actions are recorded on the blockchain for transparency

### Testing

Use Hardhat for testing:

```bash
npx hardhat test
```

### Networks

The contract can be deployed to:
- Local Hardhat network (for testing)
- Ethereum testnets (Sepolia, Goerli)
- Ethereum mainnet
- Layer 2 solutions (Polygon, Arbitrum, Optimism)

Choose the appropriate network based on your requirements and budget.
