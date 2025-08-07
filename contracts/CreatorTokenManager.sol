// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./SystemInterfaces.sol";

/**
 * @title CreatorTokenManager
 * @author Quantum Development Team
 * @notice Controls creator tokens on the Quantum Platform
 */
contract CreatorTokenManager {
    int constant OPERATION_SUCCESS = 22;
    uint256 public constant CREATOR_FEE_BPS = 500;

    struct CreatorTokenInfo {
        address tokenContract;
        uint256 totalSupply;
        uint256 tokenPrice;
        uint256 launchDate;
    }

    IQuantumPlatformCore public platformCore;
    mapping(address => address) private creatorTokenContracts;
    mapping(address => CreatorTokenInfo) private creatorTokenInfo;

    event CreatorTokenDeployed(address indexed creator, address indexed tokenContract, uint256 totalSupply, uint256 tokenPrice);
    event CreatorTokenPurchased(address indexed buyer, address indexed creator, uint256 baseTokenSpent, uint256 tokensReceived);

    modifier systemActive() {
        require(platformCore.isSystemActive(), "CreatorTokenManager: system is not active");
        _;
    }

    modifier tokenExists(address creator) {
        require(creatorTokenContracts[creator] != address(0), "CreatorTokenManager: creator token not found");
        _;
    }

    constructor(address _platformCore) {
        require(_platformCore != address(0), "CreatorTokenManager: platform core address is zero");
        platformCore = IQuantumPlatformCore(_platformCore);
    }

    function deployCreatorToken(address tokenContract, uint256 totalSupply, uint256 tokenPrice) external systemActive {
        require(tokenContract != address(0), "CreatorTokenManager: invalid token contract");
        require(creatorTokenContracts[msg.sender] == address(0), "CreatorTokenManager: creator already has token");
        require(totalSupply > 0 && tokenPrice > 0, "CreatorTokenManager: invalid parameters");

        creatorTokenContracts[msg.sender] = tokenContract;
        creatorTokenInfo[msg.sender] = CreatorTokenInfo({
            tokenContract: tokenContract,
            totalSupply: totalSupply,
            tokenPrice: tokenPrice,
            launchDate: block.timestamp
        });

        emit CreatorTokenDeployed(msg.sender, tokenContract, totalSupply, tokenPrice);
    }

    function buyCreatorToken(address creator, uint256 baseTokenAmount) external systemActive tokenExists(creator) returns (uint256) {
        require(baseTokenAmount > 0, "CreatorTokenManager: amount must be greater than zero");
        require(platformCore.checkTransactionLimits(msg.sender, baseTokenAmount), "CreatorTokenManager: exceeds transaction limits");

        platformCore.updateTransactionRecord(msg.sender, baseTokenAmount);

        CreatorTokenInfo storage tokenInfo = creatorTokenInfo[creator];
        uint256 tokensReceived = (baseTokenAmount * 1e6) / tokenInfo.tokenPrice;
        require(tokensReceived > 0, "CreatorTokenManager: amount too small");

        uint256 creatorFee = (baseTokenAmount * CREATOR_FEE_BPS) / 10000;
        uint256 creatorPayment = baseTokenAmount - creatorFee;

        IHederaTokenService hederaInterface = platformCore.getHederaInterface();
        address baseToken = platformCore.getBaseToken();
        address treasury = platformCore.getTreasuryWallet();

        // Transfer base tokens from buyer
        int operationResult = hederaInterface.transferToken(baseToken, msg.sender, address(this), int64(uint64(baseTokenAmount)));
        require(operationResult == OPERATION_SUCCESS, "CreatorTokenManager: base token transfer failed");

        // Pay creator
        operationResult = hederaInterface.transferToken(baseToken, address(this), creator, int64(uint64(creatorPayment)));
        require(operationResult == OPERATION_SUCCESS, "CreatorTokenManager: creator payment failed");

        // Pay creator fee
        operationResult = hederaInterface.transferToken(baseToken, address(this), treasury, int64(uint64(creatorFee)));
        require(operationResult == OPERATION_SUCCESS, "CreatorTokenManager: fee payment failed");

        // Transfer creator tokens
        operationResult = hederaInterface.transferToken(tokenInfo.tokenContract, creator, msg.sender, int64(uint64(tokensReceived)));
        require(operationResult == OPERATION_SUCCESS, "CreatorTokenManager: creator token transfer failed");

        emit CreatorTokenPurchased(msg.sender, creator, baseTokenAmount, tokensReceived);
        return tokensReceived;
    }

    function getCreatorTokenContract(address creator) external view returns (address) {
        return creatorTokenContracts[creator];
    }

    function getCreatorTokenInfo(address creator) external view tokenExists(creator) returns (address, uint256, uint256, uint256) {
        CreatorTokenInfo storage tokenInfo = creatorTokenInfo[creator];
        return (tokenInfo.tokenContract, tokenInfo.totalSupply, tokenInfo.tokenPrice, tokenInfo.launchDate);
    }
}
