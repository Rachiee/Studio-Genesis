// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./ServiceManager.sol";
import "./AssetManager.sol";
import "./StakeManager.sol";
import "./CreatorTokenManager.sol";
import "./SecurityModule.sol";

/**
 * @title ModuleDeployer
 * @author Quantum Development Team
 * @notice Deployer for platform module contracts
 */
contract ModuleDeployer {
    event ModulesDeployed(
        address serviceManager,
        address assetManager,
        address stakeManager,
        address creatorTokenManager,
        address securityModule
    );

    function deployAllModules(address platformCore) external returns (
        address serviceManagerAddr,
        address assetManagerAddr,
        address stakeManagerAddr,
        address creatorTokenManagerAddr,
        address securityModuleAddr
    ) {
        require(platformCore != address(0), "ModuleDeployer: platform core address is zero");

        serviceManagerAddr = address(new ServiceManager(platformCore));
        assetManagerAddr = address(new AssetManager(platformCore));
        stakeManagerAddr = address(new StakeManager(platformCore));
        creatorTokenManagerAddr = address(new CreatorTokenManager(platformCore));
        securityModuleAddr = address(new SecurityModule(platformCore));

        emit ModulesDeployed(
            serviceManagerAddr,
            assetManagerAddr,
            stakeManagerAddr,
            creatorTokenManagerAddr,
            securityModuleAddr
        );

        return (
            serviceManagerAddr,
            assetManagerAddr,
            stakeManagerAddr,
            creatorTokenManagerAddr,
            securityModuleAddr
        );
    }
}
