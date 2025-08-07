// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./SystemInterfaces.sol";

/**
 * @title SecurityModule
 * @author Quantum Development Team
 * @notice Security and protection module for the Quantum Platform
 */
contract SecurityModule {
    int constant OPERATION_SUCCESS = 22;

    IQuantumPlatformCore public platformCore;

    event SecurityAlert(address indexed reporter, string description);
    event AssetsRecovered(address indexed tokenAddress, uint256 amount);

    modifier onlyOwner() {
        require(platformCore.isOwner(msg.sender), "SecurityModule: caller is not owner");
        _;
    }

    modifier onlySupervisor() {
        require(platformCore.isSupervisor(msg.sender), "SecurityModule: caller is not supervisor");
        _;
    }

    constructor(address _platformCore) {
        require(_platformCore != address(0), "SecurityModule: platform core address is zero");
        platformCore = IQuantumPlatformCore(_platformCore);
    }

    function emergencyStop() external onlyOwner {
        platformCore.emergencyStop();
    }

    function emergencyResume() external onlyOwner {
        platformCore.emergencyResume();
    }

    function recoverAssets(address tokenAddress, uint256 amount) external onlyOwner {
        require(tokenAddress != address(0), "SecurityModule: invalid token address");
        require(amount > 0, "SecurityModule: amount must be greater than zero");

        IHederaTokenService hederaInterface = platformCore.getHederaInterface();
        int operationResult = hederaInterface.transferToken(tokenAddress, address(this), msg.sender, int64(uint64(amount)));
        require(operationResult == OPERATION_SUCCESS, "SecurityModule: asset recovery failed");

        emit AssetsRecovered(tokenAddress, amount);
    }

    function reportSecurityAlert(string calldata description) external onlySupervisor {
        emit SecurityAlert(msg.sender, description);
    }
}
