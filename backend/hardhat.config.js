require("dotenv").config();
require("@nomicfoundation/hardhat-toolbox");

module.exports = {
  solidity: {
    version: "0.8.20",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
  defaultNetwork: "testnet",
  networks: {
    testnet: {
      // HashIO RPC testnet endpoint in the .env file
      url: process.env.RPC_URL || "https://testnet.hashio.io/api",
      // Your ECDSA account private key pulled from the .env file
      accounts: process.env.OPERATOR_KEY ? [process.env.OPERATOR_KEY] : [],
      gas: 3000000,
      gasPrice: 350000000000, // 350 gwei - Hedera minimum
    },
    mainnet: {
      url: process.env.MAINNET_RPC_URL || "https://mainnet.hashio.io/api",
      accounts: process.env.MAINNET_OPERATOR_KEY ? [process.env.MAINNET_OPERATOR_KEY] : [],
      gas: 3000000,
      gasPrice: 350000000000, // 350 gwei - Hedera minimum
    },
    localhost: {
      url: "http://127.0.0.1:8545",
      accounts: [process.env.LOCAL_OPERATOR_KEY || "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80"]
    }
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts"
  },
  mocha: {
    timeout: 40000
  },
  etherscan: {
    apiKey: {
      hedera: "YOUR_HEDERA_API_KEY"
    },
    customChains: [
      {
        network: "hedera",
        chainId: 296,
        urls: {
          apiURL: "https://server-verify.hashscan.io",
          browserURL: "https://hashscan.io"
        }
      }
    ]
  },
  // Contract compilation settings for the 13 smart contracts
  contractSizer: {
    alphaSort: true,
    disambiguatePaths: false,
    runOnCompile: true,
    strict: true,
    only: [
      "SystemInterfaces",
      "NexusEcosystemHub", 
      "QuantumPlatformCore",
      "TokenExchangeProcessor",
      "SecurityManager",
      "ServiceManager",
      "AssetManager",
      "StakeManager",
      "CreatorTokenManager",
      "SecurityModule",
      "PlatformGateway",
      "ModuleDeployer",
      "SystemOrchestrator"
    ]
  },
  gasReporter: {
    enabled: process.env.REPORT_GAS !== undefined,
    currency: "USD",
    gasPrice: 350, // Updated to reflect Hedera's gas price in gwei
    coinmarketcap: process.env.COINMARKETCAP_API_KEY
  }
};
