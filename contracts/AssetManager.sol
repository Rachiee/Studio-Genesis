// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./SystemInterfaces.sol";

/**
 * @title AssetManager
 * @author Quantum Development Team
 * @notice Manages digital assets on the Quantum Platform
 */
contract AssetManager {
    int constant OPERATION_SUCCESS = 22;
    uint256 public constant ASSET_FEE_BPS = 700;

    struct AssetRecord {
        address assetOwner;
        string assetDescription;
        uint256 assetPrice;
        bool isAvailable;
    }

    IQuantumPlatformCore public platformCore;
    mapping(address => mapping(int64 => AssetRecord)) private assetRecords;

    event AssetListed(address indexed assetContract, int64 assetId, address indexed owner, uint256 price);
    event AssetSold(address indexed assetContract, int64 assetId, address indexed seller, address indexed buyer, uint256 totalPrice);

    modifier systemActive() {
        require(platformCore.isSystemActive(), "AssetManager: system is not active");
        _;
    }

    modifier assetExists(address assetContract, int64 assetId) {
        require(assetRecords[assetContract][assetId].assetOwner != address(0), "AssetManager: asset not found");
        _;
    }

    constructor(address _platformCore) {
        require(_platformCore != address(0), "AssetManager: platform core address is zero");
        platformCore = IQuantumPlatformCore(_platformCore);
    }

    function listAsset(address assetContract, int64 assetId, string calldata assetDescription, uint256 assetPrice) external systemActive {
        require(assetContract != address(0), "AssetManager: invalid asset contract");
        require(assetId > 0, "AssetManager: invalid asset ID");
        require(assetPrice > 0, "AssetManager: invalid price");
        require(assetRecords[assetContract][assetId].assetOwner == address(0), "AssetManager: asset already listed");

        assetRecords[assetContract][assetId] = AssetRecord({
            assetOwner: msg.sender,
            assetDescription: assetDescription,
            assetPrice: assetPrice,
            isAvailable: true
        });

        emit AssetListed(assetContract, assetId, msg.sender, assetPrice);
    }

    function purchaseAsset(address assetContract, int64 assetId) external systemActive assetExists(assetContract, assetId) {
        AssetRecord storage asset = assetRecords[assetContract][assetId];
        require(asset.isAvailable, "AssetManager: asset not available");
        require(msg.sender != asset.assetOwner, "AssetManager: cannot purchase own asset");
        require(platformCore.checkTransactionLimits(msg.sender, asset.assetPrice), "AssetManager: exceeds transaction limits");

        platformCore.updateTransactionRecord(msg.sender, asset.assetPrice);

        uint256 assetFee = (asset.assetPrice * ASSET_FEE_BPS) / 10000;
        uint256 sellerPayment = asset.assetPrice - assetFee;

        IHederaTokenService hederaInterface = platformCore.getHederaInterface();
        address baseToken = platformCore.getBaseToken();
        address treasury = platformCore.getTreasuryWallet();
        address seller = asset.assetOwner;

        // Transfer payment from buyer to contract
        int operationResult = hederaInterface.transferToken(baseToken, msg.sender, address(this), int64(uint64(asset.assetPrice)));
        require(operationResult == OPERATION_SUCCESS, "AssetManager: payment transfer failed");

        // Pay seller
        operationResult = hederaInterface.transferToken(baseToken, address(this), seller, int64(uint64(sellerPayment)));
        require(operationResult == OPERATION_SUCCESS, "AssetManager: seller payment failed");

        // Pay asset fee
        operationResult = hederaInterface.transferToken(baseToken, address(this), treasury, int64(uint64(assetFee)));
        require(operationResult == OPERATION_SUCCESS, "AssetManager: fee payment failed");

        // Transfer NFT
        operationResult = hederaInterface.transferNFT(assetContract, seller, msg.sender, assetId);
        require(operationResult == OPERATION_SUCCESS, "AssetManager: NFT transfer failed");

        asset.assetOwner = msg.sender;
        asset.isAvailable = false;

        emit AssetSold(assetContract, assetId, seller, msg.sender, asset.assetPrice);
    }

    function getAssetRecord(address assetContract, int64 assetId) external view assetExists(assetContract, assetId) returns (AssetRecord memory) {
        return assetRecords[assetContract][assetId];
    }
}
