// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title IHederaTokenService
 * @notice Interface for the Hedera Token Service precompiled contract
 */
interface IHederaTokenService {
    function transferToken(address token, address sender, address receiver, int64 amount) external returns (int);
    function transferNFT(address token, address sender, address receiver, int64 serialNumber) external returns (int);
    function mintToken(address token, int64 amount, bytes[] memory metadata) external returns (int, int64[] memory);
    function wipeToken(address token, address from, int64 amount) external returns (int);
    function associateToken(address account, address token) external returns (int);
}

/**
 * @title INexusEcosystemCore
 * @notice Interface for core Nexus Ecosystem platform functions
 */
interface INexusEcosystemCore {
    function isOwner(address account) external view returns (bool);
    function isManager(address account) external view returns (bool);
    function isActive() external view returns (bool);
    function getHederaService() external view returns (IHederaTokenService);
    function getReserveWallet() external view returns (address);
    function getPrimaryToken() external view returns (address);
    function getSecondaryToken() external view returns (address);
    function getExchangeRate() external view returns (uint256);
    function validateTransactionLimits(address account, uint256 amount) external returns (bool);
    function recordTransaction(address account, uint256 amount) external;
    function pauseSystem() external;
    function resumeSystem() external;
}

/**
 * @title IQuantumPlatformCore
 * @notice Interface for core Quantum Platform functions
 */
interface IQuantumPlatformCore {
    function isOwner(address account) external view returns (bool);
    function isSupervisor(address account) external view returns (bool);
    function isSystemActive() external view returns (bool);
    function getHederaInterface() external view returns (IHederaTokenService);
    function getTreasuryWallet() external view returns (address);
    function getBaseToken() external view returns (address);
    function getUtilityToken() external view returns (address);
    function checkTransactionLimits(address account, uint256 amount) external returns (bool);
    function updateTransactionRecord(address account, uint256 amount) external;
    function emergencyStop() external;
    function emergencyResume() external;
    function changeOwner(address newOwner) external;
    function addSupervisor(address supervisor) external;
    function removeSupervisor(address supervisor) external;
    function setTokenAddresses(address _baseToken, address _utilityToken) external;
}
