// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./SystemInterfaces.sol";

/**
 * @title PlatformGateway
 * @author Quantum Development Team
 * @notice Gateway contract for the Quantum Platform ecosystem
 */
contract PlatformGateway {
    bytes32 private constant CONTROLLER_SLOT = bytes32(uint256(keccak256('eip1967.gateway.controller')) - 1);

    IQuantumPlatformCore public platformCore;
    address public serviceManager;
    address public assetManager;
    address public stakeManager;
    address public creatorTokenManager;
    address public securityModule;

    event GatewayDeployed(address indexed platformCore);
    event ModulesLinked(address serviceManager, address assetManager, address stakeManager, address creatorTokenManager, address securityModule);

    constructor(address _platformCore) {
        require(_platformCore != address(0), "PlatformGateway: platform core address is zero");
        platformCore = IQuantumPlatformCore(_platformCore);
        _setController(msg.sender);
        emit GatewayDeployed(_platformCore);
    }

    modifier onlyController() {
        require(msg.sender == _getController(), "PlatformGateway: caller is not controller");
        _;
    }

    function linkModules(
        address _serviceManager,
        address _assetManager,
        address _stakeManager,
        address _creatorTokenManager,
        address _securityModule
    ) external onlyController {
        require(_serviceManager != address(0), "Invalid service manager");
        require(_assetManager != address(0), "Invalid asset manager");
        require(_stakeManager != address(0), "Invalid stake manager");
        require(_creatorTokenManager != address(0), "Invalid creator token manager");
        require(_securityModule != address(0), "Invalid security module");

        serviceManager = _serviceManager;
        assetManager = _assetManager;
        stakeManager = _stakeManager;
        creatorTokenManager = _creatorTokenManager;
        securityModule = _securityModule;

        emit ModulesLinked(_serviceManager, _assetManager, _stakeManager, _creatorTokenManager, _securityModule);
    }

    function changeController(address newController) external onlyController {
        require(newController != address(0), "PlatformGateway: invalid controller");
        _setController(newController);
    }

    function getController() external view returns (address) {
        return _getController();
    }

    // Platform Core proxy functions
    function changeOwner(address newOwner) external {
        require(msg.sender == _getController(), "Unauthorized");
        platformCore.changeOwner(newOwner);
    }

    function addSupervisor(address supervisor) external {
        require(msg.sender == _getController(), "Unauthorized");
        platformCore.addSupervisor(supervisor);
    }

    function emergencyStop() external {
        require(msg.sender == _getController(), "Unauthorized");
        platformCore.emergencyStop();
    }

    function emergencyResume() external {
        require(msg.sender == _getController(), "Unauthorized");
        platformCore.emergencyResume();
    }

    function _setController(address newController) private {
        bytes32 slot = CONTROLLER_SLOT;
        assembly {
            sstore(slot, newController)
        }
    }

    function _getController() private view returns (address controller) {
        bytes32 slot = CONTROLLER_SLOT;
        assembly {
            controller := sload(slot)
        }
    }
}
