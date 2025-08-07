// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./SystemInterfaces.sol";

/**
 * @title SecurityManager
 * @author Nexus Development Team
 * @notice Controls security mechanisms for the Nexus Ecosystem platform
 */
contract SecurityManager {
    int constant OPERATION_SUCCESS = 22;

    INexusEcosystemCore public ecosystemCore;

    event SecurityIncident(address indexed reporter, string description);
    event AssetsRecovered(address indexed tokenAddress, uint256 amount);

    modifier onlyOwner() {
        require(ecosystemCore.isOwner(msg.sender), "SecurityManager: caller is not the owner");
        _;
    }

    modifier onlyAuthorized() {
        require(ecosystemCore.isManager(msg.sender), "SecurityManager: caller is not authorized");
        _;
    }

    constructor(address _ecosystemCore) {
        require(_ecosystemCore != address(0), "SecurityManager: ecosystem core address is zero");
        ecosystemCore = INexusEcosystemCore(_ecosystemCore);
    }

    function pauseSystem() external onlyOwner {
        ecosystemCore.pauseSystem();
    }

    function resumeSystem() external onlyOwner {
        ecosystemCore.resumeSystem();
    }

    function recoverAssets(address tokenAddress, uint256 recoveryAmount) external onlyOwner {
        require(recoveryAmount > 0, "SecurityManager: recovery amount must be greater than zero");
        
        IHederaTokenService hederaService = ecosystemCore.getHederaService();
        int operationResult = hederaService.transferToken(tokenAddress, address(this), msg.sender, int64(uint64(recoveryAmount)));
        require(operationResult == OPERATION_SUCCESS, "SecurityManager: asset recovery failed");
        
        emit AssetsRecovered(tokenAddress, recoveryAmount);
    }

    function reportIncident(string calldata description) external onlyAuthorized {
        emit SecurityIncident(msg.sender, description);
    }
}
