// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract FarmRegistry {
    
    struct Farm {
        string farmId;       
        string endpoint;     
        uint256 registeredAt;
    }

    mapping(address => Farm) public farms;
    address[] public farmAddresses;

    event FarmRegistered(address indexed farmAddress, string farmId, string endpoint, uint256 timestamp);

    modifier onlyUnregistered() {
        require(bytes(farms[msg.sender].farmId).length == 0, "Farm already registered.");
        _;
    }

    function registerFarm(string calldata _farmId, string calldata _endpoint) external onlyUnregistered {
        farms[msg.sender] = Farm({
            farmId: _farmId,
            endpoint: _endpoint,
            registeredAt: block.timestamp
        });

        farmAddresses.push(msg.sender);

        emit FarmRegistered(msg.sender, _farmId, _endpoint, block.timestamp);
    }

    function getAllFarms() external view returns (Farm[] memory) {
        uint256 count = farmAddresses.length;
        Farm[] memory allFarms = new Farm[](count);

        for (uint256 i = 0; i < count; i++) {
            allFarms[i] = farms[farmAddresses[i]];
        }

        return allFarms;
    }

    function getFarmCount() external view returns (uint256) {
        return farmAddresses.length;
    }
}
