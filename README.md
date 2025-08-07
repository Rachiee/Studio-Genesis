# Studio Genesis

Studio Genesis is a comprehensive blockchain-based heritage platform built on the Hedera network. It provides a decentralized ecosystem for managing digital assets, equity tokens, and cultural heritage preservation through smart contracts.

## Overview

Studio Genesis combines cutting-edge blockchain technology with heritage preservation, offering:

- **Digital Asset Management**: Secure handling of digital heritage assets
- **Equity Token System**: Tokenized ownership and trading mechanisms
- **Cultural Preservation**: Tools for preserving and managing cultural artifacts
- **Decentralized Governance**: Community-driven platform management
- **Security Modules**: Advanced protection mechanisms for valuable assets

## Architecture

The platform consists of 13 core smart contracts organized into several modules:

### Core Contracts
- **NexusEcosystemHub**: Central hub for ecosystem management
- **QuantumPlatformCore**: Core platform functionality
- **SystemOrchestrator**: Orchestrates system-wide operations

### Heritage Management
- **HeritagePlatformCore**: Main heritage platform logic
- **DigitalAssetHandler**: Manages digital heritage assets
- **EquityHandler**: Handles equity token operations
- **ArtistTokenController**: Controls artist-specific tokens
- **ProtectionModule**: Security and protection mechanisms

### Infrastructure
- **ServiceCoordinator**: Coordinates platform services
- **TokenExchangeProcessor**: Handles token exchanges
- **SecurityManager**: Manages platform security
- **ModuleDeployer**: Deploys and manages modules
- **PlatformGateway**: Gateway for external interactions

## Quick Start

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Hedera testnet account with HBAR
- Git

### Installation

\`\`\`bash
# Clone the repository
git clone repository
cd into repository

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env
\`\`\`

### Environment Setup

Edit your `.env` file with your Hedera credentials:

\`\`\`env
HEDERA_ACCOUNT_ID=your_account_id
HEDERA_PRIVATE_KEY=your_private_key
HEDERA_NETWORK=testnet
\`\`\`

### Compilation

\`\`\`bash
# Compile all contracts
npx hardhat compile
\`\`\`

### Deployment

\`\`\`bash
# Deploy to Hedera testnet
npx hardhat run scripts/deploy.js --network hedera-testnet

# Deploy to Hedera mainnet
npx hardhat run scripts/deploy.js --network hedera-mainnet
\`\`\`

## 📋 Contract Addresses

After deployment, your contract addresses will be displayed. Keep track of these for integration:

\`\`\`
NexusEcosystemHub: 0x...
QuantumPlatformCore: 0x...
HeritagePlatformCore: 0x...
// ... other contracts
\`\`\`

## 🔧 Configuration

### Hardhat Configuration

The project uses Hardhat with custom Hedera network configuration:

\`\`\`javascript
networks: {
  'hedera-testnet': {
    url: 'https://testnet.hashio.io/api',
    accounts: [process.env.HEDERA_PRIVATE_KEY],
    gasPrice: 350000000000, // 350 gwei
  }
}
\`\`\`

### Gas Settings

- **Gas Price**: 350 gwei (minimum for Hedera)
- **Gas Limit**: Automatically estimated
- **Gas Reporter**: Enabled for cost analysis

## Usage Examples

### Interacting with Heritage Platform

\`\`\`javascript
const { ethers } = require("hardhat");

async function interactWithPlatform() {
  // Get contract instance
  const HeritagePlatform = await ethers.getContractFactory("HeritagePlatformCore");
  const platform = HeritagePlatform.attach("CONTRACT_ADDRESS");
  
  // Example: Register a digital asset
  const tx = await platform.registerDigitalAsset(
    "asset_id",
    "metadata_uri",
    { value: ethers.utils.parseEther("1.0") }
  );
  
  await tx.wait();
  console.log("Digital asset registered!");
}
\`\`\`

### Managing Equity Tokens

\`\`\`javascript
async function manageEquity() {
  const EquityHandler = await ethers.getContractFactory("EquityHandler");
  const equity = EquityHandler.attach("CONTRACT_ADDRESS");
  
  // Create equity token
  const tx = await equity.createEquityToken(
    "TOKEN_NAME",
    "TOKEN_SYMBOL",
    1000000 // Total supply
  );
  
  await tx.wait();
}
\`\`\`

## Testing

\`\`\`bash
# Run all tests
npx hardhat test

# Run specific test file
npx hardhat test test/HeritagePlatform.test.js

# Run tests with gas reporting
REPORT_GAS=true npx hardhat test
\`\`\`

## Gas Optimization

The contracts are optimized for Hedera's gas requirements:

- Efficient storage patterns
- Minimal external calls
- Optimized loops and conditionals
- Gas-efficient data structures

## 🔐 Security Features

- **Multi-signature support**: Critical operations require multiple signatures
- **Access control**: Role-based permissions system
- **Reentrancy protection**: Guards against reentrancy attacks
- **Input validation**: Comprehensive parameter validation
- **Emergency pause**: Circuit breaker for emergency situations

## 🌐 Network Support

### Hedera Testnet
- **Network ID**: 296
- **RPC URL**: https://testnet.hashio.io/api
- **Explorer**: https://hashscan.io/testnet

### Hedera Mainnet
- **Network ID**: 295
- **RPC URL**: https://mainnet.hashio.io/api
- **Explorer**: https://hashscan.io/mainnet