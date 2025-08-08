// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./SystemInterfaces.sol";

/**
 * @title ServiceManager
 * @author Quantum Development Team
 * @notice Manages services on the Quantum Platform
 */
contract ServiceManager {
    uint256 public constant SERVICE_FEE_BPS = 500;
    int constant OPERATION_SUCCESS = 22;

    struct ServiceListing {
        address serviceProvider;
        uint256 serviceRate;
        bool isCompleted;
        string serviceDescription;
        address serviceClient;
        uint256 createdAt;
    }

    IQuantumPlatformCore public platformCore;
    mapping(uint256 => ServiceListing) private serviceListings;
    uint256 public serviceCounter;

    event ServiceCreated(uint256 indexed serviceId, address indexed provider, uint256 rate);
    event ServiceCompleted(uint256 indexed serviceId, address indexed client, address indexed provider, uint256 totalAmount);

    modifier systemActive() {
        require(platformCore.isSystemActive(), "ServiceManager: system is not active");
        _;
    }

    constructor(address _platformCore) {
        require(_platformCore != address(0), "ServiceManager: platform core address is zero");
        platformCore = IQuantumPlatformCore(_platformCore);
    }

    function createService(uint256 rate, string calldata serviceDescription) external systemActive returns (uint256) {
        require(rate > 0, "ServiceManager: rate must be greater than zero");
        require(bytes(serviceDescription).length > 0, "ServiceManager: empty description");

        uint256 serviceId = serviceCounter++;
        serviceListings[serviceId] = ServiceListing({
            serviceProvider: msg.sender,
            serviceRate: rate,
            isCompleted: false,
            serviceDescription: serviceDescription,
            serviceClient: address(0),
            createdAt: block.timestamp
        });

        emit ServiceCreated(serviceId, msg.sender, rate);
        return serviceId;
    }

    function purchaseService(uint256 serviceId) external systemActive {
        ServiceListing storage service = serviceListings[serviceId];
        require(service.serviceProvider != address(0), "ServiceManager: service not found");
        require(!service.isCompleted, "ServiceManager: service already completed");
        require(msg.sender != service.serviceProvider, "ServiceManager: provider cannot purchase own service");
        require(platformCore.checkTransactionLimits(msg.sender, service.serviceRate), "ServiceManager: exceeds transaction limits");

        platformCore.updateTransactionRecord(msg.sender, service.serviceRate);

        uint256 serviceFee = (service.serviceRate * SERVICE_FEE_BPS) / 10000;
        uint256 providerPayment = service.serviceRate - serviceFee;

        IHederaTokenService hederaInterface = platformCore.getHederaInterface();
        address baseToken = platformCore.getBaseToken();
        address treasury = platformCore.getTreasuryWallet();

        // Transfer tokens from client to contract
        int operationResult = hederaInterface.transferToken(baseToken, msg.sender, address(this), int64(uint64(service.serviceRate)));
        require(operationResult == OPERATION_SUCCESS, "ServiceManager: token transfer failed");

        // Pay service provider
        operationResult = hederaInterface.transferToken(baseToken, address(this), service.serviceProvider, int64(uint64(providerPayment)));
        require(operationResult == OPERATION_SUCCESS, "ServiceManager: provider payment failed");

        // Pay service fee to treasury
        operationResult = hederaInterface.transferToken(baseToken, address(this), treasury, int64(uint64(serviceFee)));
        require(operationResult == OPERATION_SUCCESS, "ServiceManager: fee payment failed");

        service.isCompleted = true;
        service.serviceClient = msg.sender;

        emit ServiceCompleted(serviceId, msg.sender, service.serviceProvider, service.serviceRate);
    }

    function getServiceDetails(uint256 serviceId) external view returns (ServiceListing memory) {
        require(serviceListings[serviceId].serviceProvider != address(0), "ServiceManager: service not found");
        return serviceListings[serviceId];
    }
}
