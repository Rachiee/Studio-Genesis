// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./SystemInterfaces.sol";

/**
 * @title QuantumPlatformCore
 * @author Quantum Development Team
 * @notice Core contract for the Quantum Platform
 */
contract QuantumPlatformCore is IQuantumPlatformCore {
    address constant HEDERA_TOKEN_SERVICE = address(0x0000000000000000000167);
    
    address public platformOwner;
    address public treasuryWallet;
    address public baseTokenAddress;
    address public utilityTokenAddress;
    bool public systemActive;
    uint256 public maxTransactionAmount = 10000 * 1e6;
    uint256 public dailyTransactionCap = 100000 * 1e6;

    mapping(address => bool) public supervisors;
    mapping(address => uint256) public dailyTransactionTotals;
    mapping(address => uint256) public lastTransactionTimestamp;

    event OwnershipChanged(address indexed oldOwner, address indexed newOwner);
    event SystemStopped();
    event SystemStarted();

    modifier onlyOwner() {
        require(msg.sender == platformOwner, "QuantumPlatformCore: caller is not owner");
        _;
    }

    modifier onlySupervisor() {
        require(supervisors[msg.sender] || msg.sender == platformOwner, "QuantumPlatformCore: caller is not supervisor");
        _;
    }

    constructor() {
        platformOwner = msg.sender;
        treasuryWallet = msg.sender;
        systemActive = true;
    }

    function isOwner(address account) external view override returns (bool) {
        return account == platformOwner;
    }

    function isSupervisor(address account) external view override returns (bool) {
        return supervisors[account] || account == platformOwner;
    }

    function isSystemActive() external view override returns (bool) {
        return systemActive;
    }

    function getHederaInterface() external view override returns (IHederaTokenService) {
        return IHederaTokenService(HEDERA_TOKEN_SERVICE);
    }

    function getTreasuryWallet() external view override returns (address) {
        return treasuryWallet;
    }

    function getBaseToken() external view override returns (address) {
        return baseTokenAddress;
    }

    function getUtilityToken() external view override returns (address) {
        return utilityTokenAddress;
    }

    function checkTransactionLimits(address account, uint256 amount) external override returns (bool) {
        if (amount > maxTransactionAmount) return false;
        
        uint256 currentDay = block.timestamp / 1 days;
        if (currentDay > lastTransactionTimestamp[account]) {
            lastTransactionTimestamp[account] = currentDay;
            dailyTransactionTotals[account] = 0;
        }
        
        return dailyTransactionTotals[account] + amount <= dailyTransactionCap;
    }

    function updateTransactionRecord(address account, uint256 amount) external override {
        uint256 currentDay = block.timestamp / 1 days;
        if (currentDay > lastTransactionTimestamp[account]) {
            lastTransactionTimestamp[account] = currentDay;
            dailyTransactionTotals[account] = 0;
        }
        dailyTransactionTotals[account] += amount;
    }

    function changeOwner(address newOwner) external onlyOwner {
        require(newOwner != address(0), "Invalid owner address");
        emit OwnershipChanged(platformOwner, newOwner);
        platformOwner = newOwner;
    }

    function addSupervisor(address supervisor) external onlyOwner {
        require(supervisor != address(0), "Invalid supervisor address");
        supervisors[supervisor] = true;
    }

    function removeSupervisor(address supervisor) external onlyOwner {
        supervisors[supervisor] = false;
    }

    function setTokenAddresses(address _baseToken, address _utilityToken) external onlyOwner {
        require(_baseToken != address(0) && _utilityToken != address(0), "Invalid token addresses");
        baseTokenAddress = _baseToken;
        utilityTokenAddress = _utilityToken;
    }

    function emergencyStop() external override onlyOwner {
        systemActive = false;
        emit SystemStopped();
    }

    function emergencyResume() external override onlyOwner {
        systemActive = true;
        emit SystemStarted();
    }
}
