// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract CertificateVerification {
    struct Certificate {
        bytes32 certificateHash;
        string studentName;
        string courseName;
        string issuedBy;
        uint256 issueDate;
        address issuer;
        bool isValid;
        bool exists;
    }

    mapping(bytes32 => Certificate) public certificates;
    mapping(address => bool) public authorizedIssuers;
    mapping(address => bytes32[]) public issuerCertificates;

    address public owner;
    uint256 public totalCertificates;

    event CertificateIssued(
        bytes32 indexed certificateHash,
        string studentName,
        string courseName,
        address indexed issuer,
        uint256 issueDate
    );

    event CertificateRevoked(
        bytes32 indexed certificateHash,
        address indexed revokedBy,
        uint256 revokeDate
    );

    event IssuerAuthorized(address indexed issuer, uint256 timestamp);
    event IssuerRevoked(address indexed issuer, uint256 timestamp);

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can perform this action");
        _;
    }

    modifier onlyAuthorizedIssuer() {
        require(
            authorizedIssuers[msg.sender] || msg.sender == owner,
            "Not an authorized issuer"
        );
        _;
    }

    constructor() {
        owner = msg.sender;
        authorizedIssuers[msg.sender] = true;
    }

    function issueCertificate(
        string memory _studentName,
        string memory _courseName,
        string memory _issuedBy,
        bytes32 _certificateHash
    ) public onlyAuthorizedIssuer returns (bytes32) {
        require(!certificates[_certificateHash].exists, "Certificate already exists");
        require(bytes(_studentName).length > 0, "Student name required");
        require(bytes(_courseName).length > 0, "Course name required");

        certificates[_certificateHash] = Certificate({
            certificateHash: _certificateHash,
            studentName: _studentName,
            courseName: _courseName,
            issuedBy: _issuedBy,
            issueDate: block.timestamp,
            issuer: msg.sender,
            isValid: true,
            exists: true
        });

        issuerCertificates[msg.sender].push(_certificateHash);
        totalCertificates++;

        emit CertificateIssued(
            _certificateHash,
            _studentName,
            _courseName,
            msg.sender,
            block.timestamp
        );

        return _certificateHash;
    }

    function verifyCertificate(bytes32 _certificateHash)
        public
        view
        returns (
            bool exists,
            bool isValid,
            string memory studentName,
            string memory courseName,
            string memory issuedBy,
            uint256 issueDate,
            address issuer
        )
    {
        Certificate memory cert = certificates[_certificateHash];
        return (
            cert.exists,
            cert.isValid,
            cert.studentName,
            cert.courseName,
            cert.issuedBy,
            cert.issueDate,
            cert.issuer
        );
    }

    function revokeCertificate(bytes32 _certificateHash)
        public
        onlyAuthorizedIssuer
    {
        require(certificates[_certificateHash].exists, "Certificate does not exist");
        require(
            certificates[_certificateHash].issuer == msg.sender || msg.sender == owner,
            "Only issuer or owner can revoke"
        );

        certificates[_certificateHash].isValid = false;

        emit CertificateRevoked(_certificateHash, msg.sender, block.timestamp);
    }

    function authorizeIssuer(address _issuer) public onlyOwner {
        require(_issuer != address(0), "Invalid address");
        require(!authorizedIssuers[_issuer], "Already authorized");

        authorizedIssuers[_issuer] = true;
        emit IssuerAuthorized(_issuer, block.timestamp);
    }

    function revokeIssuer(address _issuer) public onlyOwner {
        require(authorizedIssuers[_issuer], "Not an authorized issuer");
        require(_issuer != owner, "Cannot revoke owner");

        authorizedIssuers[_issuer] = false;
        emit IssuerRevoked(_issuer, block.timestamp);
    }

    function getIssuerCertificates(address _issuer)
        public
        view
        returns (bytes32[] memory)
    {
        return issuerCertificates[_issuer];
    }

    function getCertificateDetails(bytes32 _certificateHash)
        public
        view
        returns (Certificate memory)
    {
        require(certificates[_certificateHash].exists, "Certificate does not exist");
        return certificates[_certificateHash];
    }

    function isAuthorizedIssuer(address _issuer) public view returns (bool) {
        return authorizedIssuers[_issuer];
    }
}
