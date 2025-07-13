// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ModelContainer {


    mapping(address => string) public rnnModels;
  
    mapping(address => string) public randomForestModels;
  
    mapping(address => string) public mlpModels;

   
    event RNNModelUpdated(address indexed user, string modelData);
    event RandomForestModelUpdated(address indexed user, string modelData);
    event MLPModelUpdated(address indexed user, string modelData);
   
    function setRNNModel(string calldata modelData) external {
        rnnModels[msg.sender] = modelData;
        emit RNNModelUpdated(msg.sender, modelData);
    }
 
    function setRandomForestModel(string calldata modelData) external {
        randomForestModels[msg.sender] = modelData;
        emit RandomForestModelUpdated(msg.sender, modelData);
    }
  
    function setMLPModel(string calldata modelData) external {
        mlpModels[msg.sender] = modelData;
        emit MLPModelUpdated(msg.sender, modelData);
    }
  
    function getRNNModel(address user) external view returns (string memory) {
        return rnnModels[user];
    }
  
    function getRandomForestModel(address user) external view returns (string memory) {
        return randomForestModels[user];
    }

    function getMLPModel(address user) external view returns (string memory) {
        return mlpModels[user];
    }
}
