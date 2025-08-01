// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ModelContainer {

    mapping(address => string) public lstmModels;
    mapping(address => string) public randomForestModels;
    mapping(address => string) public mlpModels;
    mapping(address => string) public gradientBoostingModels;
    mapping(address => string) public linearRegressionModels;

    event LSTMModelUpdated(address indexed user, string modelData);
    event RandomForestModelUpdated(address indexed user, string modelData);
    event MLPModelUpdated(address indexed user, string modelData);
    event GradientBoostingModelUpdated(address indexed user, string modelData);
    event LinearRegressionModelUpdated(address indexed user, string modelData);

    // Setters
    function setLSTMModel(string calldata modelData) external {
        lstmModels[msg.sender] = modelData;
        emit LSTMModelUpdated(msg.sender, modelData);
    }

    function setRandomForestModel(string calldata modelData) external {
        randomForestModels[msg.sender] = modelData;
        emit RandomForestModelUpdated(msg.sender, modelData);
    }

    function setMLPModel(string calldata modelData) external {
        mlpModels[msg.sender] = modelData;
        emit MLPModelUpdated(msg.sender, modelData);
    }

    function setGradientBoostingModel(string calldata modelData) external {
        gradientBoostingModels[msg.sender] = modelData;
        emit GradientBoostingModelUpdated(msg.sender, modelData);
    }

    function setLinearRegressionModel(string calldata modelData) external {
        linearRegressionModels[msg.sender] = modelData;
        emit LinearRegressionModelUpdated(msg.sender, modelData);
    }

    // Getters
    function getLSTMModel(address user) external view returns (string memory) {
        return lstmModels[user];
    }

    function getRandomForestModel(address user) external view returns (string memory) {
        return randomForestModels[user];
    }

    function getMLPModel(address user) external view returns (string memory) {
        return mlpModels[user];
    }

    function getGradientBoostingModel(address user) external view returns (string memory) {
        return gradientBoostingModels[user];
    }

    function getLinearRegressionModel(address user) external view returns (string memory) {
        return linearRegressionModels[user];
    }
}
