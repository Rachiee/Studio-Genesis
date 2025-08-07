const hre = require("hardhat");
const fs = require("fs");
const path = require("path");

async function main() {
  console.log("🚀 Starting deployment of Quantum Nexus Platform contracts...");
  
  const [deployer] = await hre.ethers.getSigners();
  console.log("Deploying contracts with account:", deployer.address);
  
  // Get balance using the provider
  const balance = await hre.ethers.provider.getBalance(deployer.address);
  console.log("Account balance:", hre.ethers.formatEther(balance), "ETH");

  const deployedContracts = {};
  const deploymentLog = [];

  try {
    // 1. Deploy System Interfaces (no deployment needed - interfaces only)
    console.log("\n📋 System Interfaces defined (no deployment required)");

    // 2. Deploy NexusEcosystemHub
    console.log("\n🌐 Deploying NexusEcosystemHub...");
    const NexusEcosystemHub = await hre.ethers.getContractFactory("NexusEcosystemHub");
    const nexusHub = await NexusEcosystemHub.deploy();
    await nexusHub.waitForDeployment();
    const nexusHubAddress = await nexusHub.getAddress();
    deployedContracts.nexusHub = nexusHubAddress;
    deploymentLog.push(`NexusEcosystemHub: ${nexusHubAddress}`);
    console.log("✅ NexusEcosystemHub deployed to:", nexusHubAddress);

    // 3. Deploy QuantumPlatformCore
    console.log("\n⚛️ Deploying QuantumPlatformCore...");
    const QuantumPlatformCore = await hre.ethers.getContractFactory("QuantumPlatformCore");
    const quantumCore = await QuantumPlatformCore.deploy();
    await quantumCore.waitForDeployment();
    const quantumCoreAddress = await quantumCore.getAddress();
    deployedContracts.quantumCore = quantumCoreAddress;
    deploymentLog.push(`QuantumPlatformCore: ${quantumCoreAddress}`);
    console.log("✅ QuantumPlatformCore deployed to:", quantumCoreAddress);

    // 4. Deploy TokenExchangeProcessor
    console.log("\n💱 Deploying TokenExchangeProcessor...");
    const TokenExchangeProcessor = await hre.ethers.getContractFactory("TokenExchangeProcessor");
    const tokenProcessor = await TokenExchangeProcessor.deploy(nexusHubAddress);
    await tokenProcessor.waitForDeployment();
    const tokenProcessorAddress = await tokenProcessor.getAddress();
    deployedContracts.tokenProcessor = tokenProcessorAddress;
    deploymentLog.push(`TokenExchangeProcessor: ${tokenProcessorAddress}`);
    console.log("✅ TokenExchangeProcessor deployed to:", tokenProcessorAddress);

    // 5. Deploy SecurityManager
    console.log("\n🛡️ Deploying SecurityManager...");
    const SecurityManager = await hre.ethers.getContractFactory("SecurityManager");
    const securityManager = await SecurityManager.deploy(nexusHubAddress);
    await securityManager.waitForDeployment();
    const securityManagerAddress = await securityManager.getAddress();
    deployedContracts.securityManager = securityManagerAddress;
    deploymentLog.push(`SecurityManager: ${securityManagerAddress}`);
    console.log("✅ SecurityManager deployed to:", securityManagerAddress);

    // 6. Deploy ServiceManager
    console.log("\n🔧 Deploying ServiceManager...");
    const ServiceManager = await hre.ethers.getContractFactory("ServiceManager");
    const serviceManager = await ServiceManager.deploy(quantumCoreAddress);
    await serviceManager.waitForDeployment();
    const serviceManagerAddress = await serviceManager.getAddress();
    deployedContracts.serviceManager = serviceManagerAddress;
    deploymentLog.push(`ServiceManager: ${serviceManagerAddress}`);
    console.log("✅ ServiceManager deployed to:", serviceManagerAddress);

    // 7. Deploy AssetManager
    console.log("\n🎨 Deploying AssetManager...");
    const AssetManager = await hre.ethers.getContractFactory("AssetManager");
    const assetManager = await AssetManager.deploy(quantumCoreAddress);
    await assetManager.waitForDeployment();
    const assetManagerAddress = await assetManager.getAddress();
    deployedContracts.assetManager = assetManagerAddress;
    deploymentLog.push(`AssetManager: ${assetManagerAddress}`);
    console.log("✅ AssetManager deployed to:", assetManagerAddress);

    // 8. Deploy StakeManager
    console.log("\n🥩 Deploying StakeManager...");
    const StakeManager = await hre.ethers.getContractFactory("StakeManager");
    const stakeManager = await StakeManager.deploy(quantumCoreAddress);
    await stakeManager.waitForDeployment();
    const stakeManagerAddress = await stakeManager.getAddress();
    deployedContracts.stakeManager = stakeManagerAddress;
    deploymentLog.push(`StakeManager: ${stakeManagerAddress}`);
    console.log("✅ StakeManager deployed to:", stakeManagerAddress);

    // 9. Deploy CreatorTokenManager
    console.log("\n👨‍🎨 Deploying CreatorTokenManager...");
    const CreatorTokenManager = await hre.ethers.getContractFactory("CreatorTokenManager");
    const creatorManager = await CreatorTokenManager.deploy(quantumCoreAddress);
    await creatorManager.waitForDeployment();
    const creatorManagerAddress = await creatorManager.getAddress();
    deployedContracts.creatorManager = creatorManagerAddress;
    deploymentLog.push(`CreatorTokenManager: ${creatorManagerAddress}`);
    console.log("✅ CreatorTokenManager deployed to:", creatorManagerAddress);

    // 10. Deploy SecurityModule
    console.log("\n🔒 Deploying SecurityModule...");
    const SecurityModule = await hre.ethers.getContractFactory("SecurityModule");
    const securityModule = await SecurityModule.deploy(quantumCoreAddress);
    await securityModule.waitForDeployment();
    const securityModuleAddress = await securityModule.getAddress();
    deployedContracts.securityModule = securityModuleAddress;
    deploymentLog.push(`SecurityModule: ${securityModuleAddress}`);
    console.log("✅ SecurityModule deployed to:", securityModuleAddress);

    // 11. Deploy PlatformGateway
    console.log("\n🚪 Deploying PlatformGateway...");
    const PlatformGateway = await hre.ethers.getContractFactory("PlatformGateway");
    const gateway = await PlatformGateway.deploy(quantumCoreAddress);
    await gateway.waitForDeployment();
    const gatewayAddress = await gateway.getAddress();
    deployedContracts.gateway = gatewayAddress;
    deploymentLog.push(`PlatformGateway: ${gatewayAddress}`);
    console.log("✅ PlatformGateway deployed to:", gatewayAddress);

    // 12. Deploy ModuleDeployer
    console.log("\n🏗️ Deploying ModuleDeployer...");
    const ModuleDeployer = await hre.ethers.getContractFactory("ModuleDeployer");
    const moduleDeployer = await ModuleDeployer.deploy();
    await moduleDeployer.waitForDeployment();
    const moduleDeployerAddress = await moduleDeployer.getAddress();
    deployedContracts.moduleDeployer = moduleDeployerAddress;
    deploymentLog.push(`ModuleDeployer: ${moduleDeployerAddress}`);
    console.log("✅ ModuleDeployer deployed to:", moduleDeployerAddress);

    // 13. Deploy SystemOrchestrator (with better error handling)
    console.log("\n🎼 Deploying SystemOrchestrator...");
    try {
      // First compile to check for issues
      await hre.run("compile");
      
      const SystemOrchestrator = await hre.ethers.getContractFactory("SystemOrchestrator");
      const orchestrator = await SystemOrchestrator.deploy();
      await orchestrator.waitForDeployment();
      const orchestratorAddress = await orchestrator.getAddress();
      deployedContracts.orchestrator = orchestratorAddress;
      deploymentLog.push(`SystemOrchestrator: ${orchestratorAddress}`);
      console.log("✅ SystemOrchestrator deployed to:", orchestratorAddress);
    } catch (orchestratorError) {
      console.log("⚠️ SystemOrchestrator deployment failed, continuing without it...");
      console.log("Error details:", orchestratorError.message);
      deployedContracts.orchestrator = "DEPLOYMENT_FAILED";
      deploymentLog.push(`SystemOrchestrator: DEPLOYMENT_FAILED`);
    }

    // Configure Gateway with modules
    console.log("\n🔗 Linking modules to PlatformGateway...");
    await gateway.linkModules(
      serviceManagerAddress,
      assetManagerAddress,
      stakeManagerAddress,
      creatorManagerAddress,
      securityModuleAddress
    );
    console.log("✅ Modules linked to PlatformGateway");

    // Save deployment addresses
    const deploymentData = {
      network: hre.network.name,
      timestamp: new Date().toISOString(),
      deployer: deployer.address,
      contracts: deployedContracts,
      gasUsed: "TBD" // Could be calculated if needed
    };

    const deploymentsDir = path.join(__dirname, "..", "deployments");
    if (!fs.existsSync(deploymentsDir)) {
      fs.mkdirSync(deploymentsDir, { recursive: true });
    }

    const deploymentFile = path.join(deploymentsDir, `${hre.network.name}.json`);
    fs.writeFileSync(deploymentFile, JSON.stringify(deploymentData, null, 2));

    // Create environment variables file
    const envVars = Object.entries(deployedContracts)
      .map(([key, address]) => `${key.toUpperCase()}_ADDRESS=${address}`)
      .join('\n');
    
    const envFile = path.join(deploymentsDir, `${hre.network.name}.env`);
    fs.writeFileSync(envFile, envVars);

    console.log("\n🎉 Deployment Summary:");
    console.log("=".repeat(50));
    deploymentLog.forEach(log => console.log(`📄 ${log}`));
    console.log("=".repeat(50));
    console.log(`💾 Deployment data saved to: ${deploymentFile}`);
    console.log(`🔧 Environment variables saved to: ${envFile}`);
    console.log("\n✨ Deployment completed!");

    if (deployedContracts.orchestrator === "DEPLOYMENT_FAILED") {
      console.log("\n⚠️ Note: SystemOrchestrator failed to deploy but other contracts are functional.");
    }

  } catch (error) {
    console.error("\n❌ Deployment failed:", error);
    process.exit(1);
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
