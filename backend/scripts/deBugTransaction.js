// scripts/debugTransaction.js
// This script helps debug individual contract functions by calling them directly
const { ethers } = require("hardhat");
const fs = require("fs");

// Configure gas settings
const GAS_SETTINGS = {
  gasLimit: 15000000 // High enough for complex transactions
};

async function main() {
  console.log("Running transaction debug script...");
  
  // Load deployed addresses
  let deployedAddresses;
  try {
    deployedAddresses = JSON.parse(fs.readFileSync("deployment-addresses.json"));
    console.log("Loaded deployment addresses from file");
  } catch (error) {
    console.error("Failed to load deployment addresses:", error);
    process.exit(1);
  }
  
  // Test ManagersFactory's setupReferences function specifically
  console.log("Testing ManagersFactory.setupReferences function...");
  
  // Get contract instance
  const managersFactory = await ethers.getContractAt("ManagersFactory", deployedAddresses.managersFactory);
  
  // Get the addresses of contracts we need for testing
  const gigManagerAddr = deployedAddresses.gigManager;
  const nftManagerAddr = deployedAddresses.nftManager;
  const creatorCoinManagerAddr = deployedAddresses.creatorCoinManager;
  
  console.log("Using these addresses for setupReferences:");
  console.log("- GigManager:", gigManagerAddr);
  console.log("- NFTManager:", nftManagerAddr);
  console.log("- CreatorCoinManager:", creatorCoinManagerAddr);
  
  // Try the call with manual gas limit
  try {
    console.log("Calling setupReferences with manual gas limit...");
    const tx = await managersFactory.setupReferences(
      gigManagerAddr, 
      nftManagerAddr,
      creatorCoinManagerAddr,
      { gasLimit: 5000000 } // Very high gas limit to ensure it goes through
    );
    
    console.log("Transaction sent:", tx.hash);
    console.log("Waiting for transaction confirmation...");
    
    const receipt = await tx.wait();
    console.log("Transaction confirmed!");
    console.log("Gas used:", receipt.gasUsed.toString());
    console.log("Events:", receipt.events.map(e => e.event));
    
  } catch (error) {
    console.error("Failed to execute setupReferences:");
    console.error(error);
    
    // Try inspecting each contract to understand the issue
    console.log("\nInspecting contracts to diagnose the issue...");
    
    // Check GigManager
    try {
      const gigManager = await ethers.getContractAt("GigManager", gigManagerAddr);
      const core = await gigManager.core();
      console.log("GigManager's core is set to:", core);
    } catch (error) {
      console.error("Failed to inspect GigManager:", error.message);
    }
    
    // Check NFTManager
    try {
      const nftManager = await ethers.getContractAt("NFTManager", nftManagerAddr);
      const core = await nftManager.core();
      console.log("NFTManager's core is set to:", core);
    } catch (error) {
      console.error("Failed to inspect NFTManager:", error.message);
    }
    
    // Check CreatorCoinManager
    try {
      const creatorCoinManager = await ethers.getContractAt("CreatorCoinManager", creatorCoinManagerAddr);
      const core = await creatorCoinManager.core();
      console.log("CreatorCoinManager's core is set to:", core);
    } catch (error) {
      console.error("Failed to inspect CreatorCoinManager:", error.message);
    }
  }
}

// Execute the script
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("Fatal error:");
    console.error(error);
    process.exit(1);
  });