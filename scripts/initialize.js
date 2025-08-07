// scripts/initialize.js
const { ethers } = require("hardhat");
const fs = require("fs");

async function main() {
  console.log("Starting CulturaVerse initialization...");
 
  let deploymentAddresses;
  try {
    deploymentAddresses = JSON.parse(fs.readFileSync("deployment-addresses.json"));
  } catch (error) {
    console.error("Error loading deployment addresses:", error);
    console.error("Please make sure to run deploy.js first");
    return;
  }
 
  // Get an instance of the CulturaVerse proxy contract
  const culturaVerse = await ethers.getContractAt("CulturaVerseImplementation", deploymentAddresses.culturaVerse);
  console.log("Connected to CulturaVerse proxy at:", deploymentAddresses.culturaVerse);
 
  // Token addresses - You need to update these with your actual token addresses
  const crtTokenAddress = "0x0000000000000000000000000000000000000001"; // Replace with your actual CRT token address
  const safTokenAddress = "0x0000000000000000000000000000000000000002"; // Replace with your actual SAF token address
 
  // Set token addresses
  console.log("Setting token addresses...");
  const tokenTx = await culturaVerse.setTokenAddresses(crtTokenAddress, safTokenAddress);
  await tokenTx.wait();
  console.log("Token addresses set successfully");
 
  // Add operator - Update with your desired operator address
  const operatorAddress = "0x0000000000000000000000000000000000000003"; // Replace with your actual operator address
  console.log("Adding operator:", operatorAddress);
  const operatorTx = await culturaVerse.addOperator(operatorAddress);
  await operatorTx.wait();
  console.log("Operator added successfully");
 
  // Update exchange rates
  const crtToKshRate = 100; // 1 CRT = 100 KSH
  const safToCrtRate = 500; // 1 SAF = 500 CRT
  console.log("Setting exchange rates:", { crtToKshRate, safToCrtRate });
  const ratesTx = await culturaVerse.updateExchangeRates(crtToKshRate, safToCrtRate);
  await ratesTx.wait();
  console.log("Exchange rates updated successfully");
 
  // Set transaction limits
  const maxTransactionAmount = ethers.utils.parseUnits("10000", 6); // 10,000 tokens with 6 decimals
  const dailyTransactionLimit = ethers.utils.parseUnits("100000", 6); // 100,000 tokens per day
  console.log("Setting transaction limits");
  const limitsTx = await culturaVerse.updateTransactionLimits(maxTransactionAmount, dailyTransactionLimit);
  await limitsTx.wait();
  console.log("Transaction limits set successfully");
 
  console.log("CulturaVerse initialization complete!");
}

// Execute the initialization
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });