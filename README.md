🎓 Skill-Verification
A blockchain-powered digital certification platform that makes credential verification transparent, tamper-proof, and instant.

Skill-Verification eliminates certificate fraud by storing educational credentials directly on the Ethereum blockchain. Whether you're an institution issuing certificates or an employer verifying qualifications, this decentralized application provides cryptographic proof that certificates are authentic and unmodified.

Built for the Sepolia testnet, this platform demonstrates how blockchain technology can revolutionize credential management in education and professional training.
A decentralized application for issuing and verifying digital certificates on the Ethereum blockchain. Built with modern web technologies and deployed on the Sepolia testnet.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

[![React](https://img.shields.io/badge/React-18.2.0-61DAFB?logo=react)](https://reactjs.org/)

[![Vite](https://img.shields.io/badge/Vite-4.0.0-646CFF?logo=vite)](https://vitejs.dev/)

[![Ethereum](https://img.shields.io/badge/Ethereum-Sepolia-3C3C3D?logo=ethereum)](https://ethereum.org/)


✨ What Makes This Special
🔐 Tamper-Proof Verification
Certificates are stored on Ethereum's blockchain, making them impossible to forge or alter. Each certificate gets a unique cryptographic hash that serves as its permanent fingerprint.

⚡ Lightning-Fast Performance
Powered by Vite's next-generation build system, the application loads instantly and provides a smooth user experience even on slower networks.

📱 Universal Accessibility
Fully responsive design ensures that users can issue and verify certificates from any device - desktop, tablet, or smartphone.

🔗 Direct Blockchain Integration
No intermediaries or third-party services. The app communicates directly with Ethereum smart contracts using Ethers.js, giving you complete control.

🎨 Clean, Modern Interface
Designed with Tailwind CSS for a professional appearance that's both beautiful and functional.

🔄 Instant Transaction Feedback
Real-time updates keep users informed about their blockchain transactions from submission to confirmation.

🚀 Getting Started
Prerequisites
Before running this project, ensure you have:

Node.js version 16 or higher installed on your system
npm or yarn package manager
MetaMask browser extension configured with Sepolia testnet
Installation Steps
1. Download the project

bash
git clone https://github.com/DevilxHunter21/Skill-Verification.git
cd Skill-Verification
2. Install all required packages

bash
npm install
# If you prefer yarn:
# yarn install
3. Configure MetaMask

Switch your MetaMask network to Sepolia Testnet
Ensure you have some Sepolia ETH for gas fees (get free testnet ETH from a Sepolia faucet)
4. Launch the development environment

bash
npm run dev
# If you prefer yarn:
# yarn dev
5. Access the application

Navigate to http://localhost:3000 in your browser and connect your MetaMask wallet when prompted.

� Deployment
This project is configured for easy deployment to various platforms:

Vercel Deployment
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Vercel will automatically detect the Vite configuration and deploy
4. Your app will be live at your Vercel URL

Netlify Deployment
1. Run `npm run build` to create the production build
2. Upload the `dist/` folder to Netlify
3. Or connect your Git repository to Netlify for automatic deployments

GitHub Pages Deployment
1. Run `npm run build`
2. Upload the contents of the `dist/` folder to your `gh-pages` branch
3. Enable GitHub Pages in your repository settings

Manual Deployment
1. Run `npm run build`
2. Upload the `dist/` folder to any static hosting service
3. Ensure your hosting provider supports client-side routing

Build Commands
- `npm run dev` - Start development server
- `npm run build` - Create production build in `dist/` folder
- `npm run preview` - Preview production build locally
- `npm run deploy` - Build and display deployment instructions

�🔧 Smart Contract Details
The application interacts with a custom smart contract deployed on Ethereum's Sepolia testnet:

Contract Address: 0xd9145CCE52D386f254917e481eB44e9943F39138

Network: Sepolia Testnet (Chain ID: 11155111)

ABI Configuration: Located in src/contractConfig.js

Core Contract Functions
registerCertificate(name, course, hash)
Issues a new digital certificate and records it permanently on the blockchain. Parameters include the recipient's name, course title, and a unique hash identifier.

verifyCertificate(hash)
Validates whether a certificate exists on the blockchain and returns its details. Anyone can verify any certificate using just its hash value.

🛠️ Technology Stack
This project leverages cutting-edge web3 technologies:

Frontend Framework: React 18 with modern hooks and functional components

Build Tool: Vite for blazing-fast hot module replacement and optimized production builds

Styling: Tailwind CSS for utility-first, responsive design

Blockchain Interaction: Ethers.js v6 for Ethereum wallet connection and smart contract calls

Code Quality: ESLint and Prettier for consistent, maintainable code

Wallet Integration: MetaMask for secure transaction signing and account management

📁 Project Architecture
src/
├── components/          # Reusable UI components (buttons, forms, modals)
├── pages/              # Main page views (Home, Issue, Verify)
├── services/           # Blockchain interaction logic and API calls
├── styles/             # Global CSS and Tailwind configuration
├── utils/              # Helper functions and constants
├── contractConfig.js   # Smart contract ABI and address
├── App.jsx            # Root application component with routing
└── main.jsx           # Entry point that renders the React app
🤝 Contributing to This Project
Contributions, bug reports, and feature suggestions are highly appreciated! Here's how you can help improve Skill-Verification:

1. Fork this repository to your GitHub account

2. Create a feature branch for your changes

bash
git checkout -b feature/your-amazing-feature
3. Make your changes and commit them with descriptive messages

bash
git commit -m 'Add feature: employer dashboard for bulk verification'
4. Push your branch to your forked repository

bash
git push origin feature/your-amazing-feature
5. Submit a Pull Request explaining what you've added or fixed

Contribution Ideas
Add support for multiple certificate types (academic, professional, skill-based)
Implement QR code generation for easy certificate sharing
Create an admin dashboard for institutional users
Add certificate expiration and renewal functionality
Improve error handling and user feedback messages
📄 License
This project is released under the MIT License, giving you the freedom to use, modify, and distribute this software. See the LICENSE file for complete terms and conditions.

👨‍💻 Developer
Parth Khillare

Passionate about decentralized technologies and building applications that solve real-world problems through blockchain innovation.

GitHub: @DevilxHunter21
LinkedIn: Parth Khillare
Questions or collaboration opportunities? Feel free to reach out through GitHub issues or LinkedIn!

🙏 Acknowledgments
This project wouldn't be possible without:

Ethereum Foundation for building the infrastructure that powers decentralized applications
Vite team for creating an incredibly fast development experience
Tailwind CSS creators for revolutionizing how we write CSS
The global open-source community for countless libraries and tools that make modern web development possible
🔮 Future Roadmap
 Mainnet deployment for production use
 Integration with IPFS for storing certificate metadata
 Mobile app version (React Native)
 Multi-language support
 Certificate templates and customization options
 Batch certificate issuance for institutions
 Analytics dashboard for tracking issued certificates
Star this repository if you find it useful! ⭐

