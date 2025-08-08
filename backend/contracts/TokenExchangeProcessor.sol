// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./SystemInterfaces.sol";

/**
 * @title TokenExchangeProcessor
 * @author Nexus Development Team
 * @notice Handles token exchange transactions on the Nexus Ecosystem platform
 */
contract TokenExchangeProcessor {
    int constant OPERATION_SUCCESS = 22;
    uint256 public constant EXCHANGE_FEE_BPS = 200;

    INexusEcosystemCore public ecosystemCore;

    event TokensExchanged(address indexed buyer, uint256 primaryTokenAmount, uint256 secondaryTokenAmount, uint256 processingFee);

    modifier whenSystemActive() {
        require(ecosystemCore.isActive(), "TokenExchangeProcessor: system is not active");
        _;
    }

    constructor(address _ecosystemCore) {
        require(_ecosystemCore != address(0), "TokenExchangeProcessor: ecosystem core address is zero");
        ecosystemCore = INexusEcosystemCore(_ecosystemCore);
    }

    function exchangeTokens(uint256 primaryTokenAmount) external whenSystemActive returns (uint256) {
        require(primaryTokenAmount > 0, "TokenExchangeProcessor: amount must be greater than zero");
        require(ecosystemCore.validateTransactionLimits(msg.sender, primaryTokenAmount), "TokenExchangeProcessor: exceeds transaction limits");
        
        ecosystemCore.recordTransaction(msg.sender, primaryTokenAmount);
        
        uint256 exchangeRatio = ecosystemCore.getExchangeRate();
        uint256 secondaryTokenAmount = (primaryTokenAmount * 1e6) / exchangeRatio;
        require(secondaryTokenAmount > 0, "TokenExchangeProcessor: amount too small");

        uint256 processingFee = (primaryTokenAmount * EXCHANGE_FEE_BPS) / 10000;
        uint256 tokensToProcess = primaryTokenAmount - processingFee;

        IHederaTokenService hederaService = ecosystemCore.getHederaService();
        address primaryTokenContract = ecosystemCore.getPrimaryToken();
        address secondaryTokenContract = ecosystemCore.getSecondaryToken();
        address reserveAddress = ecosystemCore.getReserveWallet();

        // Transfer primary tokens from buyer to contract
        int operationResult = hederaService.transferToken(primaryTokenContract, msg.sender, address(this), int64(uint64(primaryTokenAmount)));
        require(operationResult == OPERATION_SUCCESS, "TokenExchangeProcessor: primary token transfer failed");

        // Transfer processing fee to reserve
        operationResult = hederaService.transferToken(primaryTokenContract, address(this), reserveAddress, int64(uint64(processingFee)));
        require(operationResult == OPERATION_SUCCESS, "TokenExchangeProcessor: fee transfer failed");

        // Burn remaining primary tokens
        operationResult = hederaService.wipeToken(primaryTokenContract, address(this), int64(uint64(tokensToProcess)));
        require(operationResult == OPERATION_SUCCESS, "TokenExchangeProcessor: token burn failed");

        // Mint secondary tokens
        bytes[] memory emptyMetadata = new bytes[](0);
        (operationResult, ) = hederaService.mintToken(secondaryTokenContract, int64(uint64(secondaryTokenAmount)), emptyMetadata);
        require(operationResult == OPERATION_SUCCESS, "TokenExchangeProcessor: secondary token mint failed");

        // Transfer minted secondary tokens to buyer
        operationResult = hederaService.transferToken(secondaryTokenContract, address(this), msg.sender, int64(uint64(secondaryTokenAmount)));
        require(operationResult == OPERATION_SUCCESS, "TokenExchangeProcessor: secondary token transfer failed");

        emit TokensExchanged(msg.sender, primaryTokenAmount, secondaryTokenAmount, processingFee);
        return secondaryTokenAmount;
    }
}
