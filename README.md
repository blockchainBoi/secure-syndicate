# Secure Syndicate

A decentralized investment syndicate platform built with FHE (Fully Homomorphic Encryption) for secure, private financial operations on the blockchain.

## Features

- **FHE-Protected Data**: All sensitive financial data is encrypted using Zama's FHE technology
- **Multi-Wallet Support**: Connect with MetaMask, WalletConnect, and other popular wallets
- **Investment Syndicates**: Create and join investment groups with encrypted contribution tracking
- **Reputation System**: Encrypted reputation scoring for members
- **Profit Distribution**: Secure, encrypted profit sharing mechanisms
- **Project Management**: Create and manage investment projects with FHE-protected metrics

## Technology Stack

- **Frontend**: React 18, TypeScript, Vite
- **UI Components**: shadcn/ui, Tailwind CSS
- **Blockchain**: Wagmi, Viem, Ethereum Sepolia
- **Encryption**: Zama FHE (Fully Homomorphic Encryption)
- **Smart Contracts**: Solidity with FHE integration

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Git
- A Web3 wallet (MetaMask recommended)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/blockchainBoi/secure-syndicate.git
cd secure-syndicate
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
# Copy the example environment file
cp .env.example .env.local

# Edit the environment variables
VITE_CHAIN_ID=11155111
VITE_RPC_URL=https://sepolia.infura.io/v3/YOUR_INFURA_KEY
VITE_WALLET_CONNECT_PROJECT_ID=YOUR_WALLET_CONNECT_PROJECT_ID
VITE_CONTRACT_ADDRESS=YOUR_DEPLOYED_CONTRACT_ADDRESS
```

4. Start the development server:
```bash
npm run dev
```

5. Open your browser and navigate to `http://localhost:5173`

## Smart Contract Deployment

The Secure Syndicate smart contract uses Zama's FHE technology for encrypted operations:

```solidity
// Key FHE features:
- Encrypted member reputation tracking
- Private investment amount storage
- Secure profit distribution calculations
- Encrypted syndicate statistics
```

### Deploy to Sepolia

1. Install Foundry:
```bash
curl -L https://foundry.paradigm.xyz | bash
foundryup
```

2. Deploy the contract:
```bash
forge build
forge create --rpc-url $SEPOLIA_RPC_URL --private-key $PRIVATE_KEY contracts/SecureSyndicate.sol:SecureSyndicate --constructor-args $VERIFIER_ADDRESS
```

## Usage

### Joining a Syndicate

1. Connect your wallet
2. Click "Join Syndicate"
3. Provide your reputation score and initial contribution (encrypted)
4. Wait for verification from the syndicate verifier

### Creating a Project

1. Ensure you're a verified syndicate member
2. Click "Create Project"
3. Set project details, target amount, and duration
4. Wait for verification

### Making Investments

1. Browse available projects
2. Click "Invest" on a project
3. Specify investment amount and expected return (encrypted)
4. Confirm the transaction

### Profit Distribution

1. As a project creator, click "Distribute Profits"
2. Specify total profit amount (encrypted)
3. The system automatically calculates member shares
4. Execute the distribution

## Security Features

- **FHE Encryption**: All sensitive data remains encrypted during computation
- **Access Control**: Role-based permissions for different operations
- **Verification System**: Multi-layer verification for members and projects
- **Audit Trail**: All operations are logged on-chain with encrypted details

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For support and questions:
- Create an issue in this repository
- Join our Discord community
- Check the documentation at [docs.secure-syndicate.com](https://docs.secure-syndicate.com)

## Roadmap

- [ ] Mobile app development
- [ ] Cross-chain support
- [ ] Advanced analytics dashboard
- [ ] Integration with DeFi protocols
- [ ] Governance token implementation
