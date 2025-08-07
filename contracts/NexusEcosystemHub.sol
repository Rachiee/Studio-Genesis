// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./SystemInterfaces.sol";

/**
 * @title NexusEcosystemHub
 * @author Nexus Development Team
 * @notice Central hub contract for Nexus Ecosystem platform with unified state management
 */
contract NexusEcosystemHub is INexusEcosystemCore {
    address constant HEDERA_TOKEN_SERVICE = address(0x0000000000000000000167);
    int constant SUCCESS_CODE = 22;
    uint256 public constant TIMELOCK_PERIOD = 24 hours;

    address public platformOwner;
    address public reserveWallet;
    bool public systemPaused;
    address public primaryTokenAddress;
    address public secondaryTokenAddress;
    uint256 public baseExchangeRate = 100;
    uint256 public tokenExchangeRate = 500;
    uint256 public maxTransactionLimit = 10000 * 1e6;
    uint256 public dailyTransactionLimit = 100000 * 1e6;
    
    mapping(address => uint256) public dailyTransactionVolume;
    mapping(address => uint256) public lastTransactionDay;
    mapping(address => bool) public authorizedManagers;

    event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);
    event SystemPaused(address indexed initiator);
    event SystemResumed(address indexed initiator);

    modifier onlyOwner() {
        require(msg.sender == platformOwner, "NexusEcosystemHub: caller is not the owner");
        _;
    }

    modifier onlyAuthorized() {
        require(msg.sender == platformOwner || authorizedManagers[msg.sender], "NexusEcosystemHub: caller is not authorized");
        _;
    }

    modifier whenActive() {
        require(!systemPaused, "NexusEcosystemHub: system is paused");
        _;
    }

    constructor() {
        platformOwner = msg.sender;
        reserveWallet = msg.sender;
    }

    function isOwner(address userAccount) external view override returns (bool) {
        return userAccount == platformOwner;
    }

    function isManager(address userAccount) external view override returns (bool) {
        return userAccount == platformOwner || authorizedManagers[userAccount];
    }

    function isActive() external view override returns (bool) {
        return !systemPaused;
    }

    function getHederaService() external view override returns (IHederaTokenService) {
        return IHederaTokenService(HEDERA_TOKEN_SERVICE);
    }

    function getReserveWallet() external view override returns (address) {
        return reserveWallet;
    }

    function getPrimaryToken() external view override returns (address) {
        return primaryTokenAddress;
    }

    function getSecondaryToken() external view override returns (address) {
        return secondaryTokenAddress;
    }

    function getExchangeRate() external view override returns (uint256) {
        return tokenExchangeRate;
    }

    function validateTransactionLimits(address userAccount, uint256 transactionAmount) external override returns (bool) {
        if (transactionAmount > maxTransactionLimit) return false;
        
        uint256 currentDay = block.timestamp / 1 days;
        if (currentDay > lastTransactionDay[userAccount]) {
            lastTransactionDay[userAccount] = currentDay;
            dailyTransactionVolume[userAccount] = 0;
        }
        
        return dailyTransactionVolume[userAccount] + transactionAmount <= dailyTransactionLimit;
    }

    function recordTransaction(address userAccount, uint256 transactionAmount) external override {
        uint256 currentDay = block.timestamp / 1 days;
        if (currentDay > lastTransactionDay[userAccount]) {
            lastTransactionDay[userAccount] = currentDay;
            dailyTransactionVolume[userAccount] = 0;
        }
        dailyTransactionVolume[userAccount] += transactionAmount;
    }

    function transferOwnership(address newOwner) external onlyOwner {
        require(newOwner != address(0), "NexusEcosystemHub: new owner is the zero address");
        emit OwnershipTransferred(platformOwner, newOwner);
        platformOwner = newOwner;
    }

    function addManager(address managerAddress) external onlyOwner {
        require(managerAddress != address(0), "NexusEcosystemHub: manager is the zero address");
        authorizedManagers[managerAddress] = true;
    }

    function removeManager(address managerAddress) external onlyOwner {
        authorizedManagers[managerAddress] = false;
    }

    function configureTokens(address _primaryToken, address _secondaryToken) external onlyOwner {
        require(_primaryToken != address(0) && _secondaryToken != address(0), "Invalid token addresses");
        primaryTokenAddress = _primaryToken;
        secondaryTokenAddress = _secondaryToken;
    }

    function pauseSystem() external onlyOwner {
        systemPaused = true;
        emit SystemPaused(msg.sender);
    }

    function resumeSystem() external onlyOwner {
        systemPaused = false;
        emit SystemResumed(msg.sender);
    }
}
