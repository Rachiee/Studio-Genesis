// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./SystemInterfaces.sol";

/**
 * @title StakeManager
 * @author Quantum Development Team
 * @notice Handles staking transactions on the Quantum Platform
 */
contract StakeManager {
    int constant OPERATION_SUCCESS = 22;
    uint256 public constant STAKE_FEE_BPS = 200;

    IQuantumPlatformCore public platformCore;

    event TokensStaked(address indexed staker, uint256 baseTokenAmount, uint256 utilityTokenAmount);

    modifier systemActive() {
        require(platformCore.isSystemActive(), "StakeManager: system is not active");
        _;
    }

    constructor(address _platformCore) {
        require(_platformCore != address(0), "StakeManager: platform core address is zero");
        platformCore = IQuantumPlatformCore(_platformCore);
    }

    function stakeTokens(uint256 baseTokenAmount) external systemActive returns (uint256) {
        require(baseTokenAmount > 0, "StakeManager: amount must be greater than zero");
        require(platformCore.checkTransactionLimits(msg.sender, baseTokenAmount), "StakeManager: exceeds transaction limits");

        platformCore.updateTransactionRecord(msg.sender, baseTokenAmount);

        // Calculate utility tokens (1:500 ratio)
        uint256 utilityTokenAmount = (baseTokenAmount * 1e6) / 500;
        require(utilityTokenAmount > 0, "StakeManager: amount too small");

        uint256 stakeFee = (baseTokenAmount * STAKE_FEE_BPS) / 10000;
        uint256 tokensToStake = baseTokenAmount - stakeFee;

        IHederaTokenService hederaInterface = platformCore.getHederaInterface();
        address baseToken = platformCore.getBaseToken();
        address utilityToken = platformCore.getUtilityToken();
        address treasury = platformCore.getTreasuryWallet();

        // Transfer base tokens from staker
        int operationResult = hederaInterface.transferToken(baseToken, msg.sender, address(this), int64(uint64(baseTokenAmount)));
        require(operationResult == OPERATION_SUCCESS, "StakeManager: base token transfer failed");

        // Transfer stake fee to treasury
        operationResult = hederaInterface.transferToken(baseToken, address(this), treasury, int64(uint64(stakeFee)));
        require(operationResult == OPERATION_SUCCESS, "StakeManager: fee transfer failed");

        // Burn remaining base tokens
        operationResult = hederaInterface.wipeToken(baseToken, address(this), int64(uint64(tokensToStake)));
        require(operationResult == OPERATION_SUCCESS, "StakeManager: token burn failed");

        // Mint utility tokens
        bytes[] memory emptyMetadata = new bytes[](0);
        (operationResult, ) = hederaInterface.mintToken(utilityToken, int64(uint64(utilityTokenAmount)), emptyMetadata);
        require(operationResult == OPERATION_SUCCESS, "StakeManager: utility token mint failed");

        // Transfer utility tokens to staker
        operationResult = hederaInterface.transferToken(utilityToken, address(this), msg.sender, int64(uint64(utilityTokenAmount)));
        require(operationResult == OPERATION_SUCCESS, "StakeManager: utility token transfer failed");

        emit TokensStaked(msg.sender, baseTokenAmount, utilityTokenAmount);
        return utilityTokenAmount;
    }
}
