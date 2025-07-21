"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataSetController = void 0;
const getDataSetCommand_1 = require("../../core/application/commands/dataSet/getDataSetCommand");
const createDataSetCommand_1 = require("../../core/application/commands/dataSet/createDataSetCommand");
class DataSetController {
    constructor(_dataSetRepository) {
        this._dataSetRepository = _dataSetRepository;
        this.getDataSetAsync = async (req, res) => {
            try {
                const command = new getDataSetCommand_1.GetDataSetCommand(this._dataSetRepository);
                const result = await command.executeAsync();
                res.status(200).json(result);
            }
            catch (error) {
                console.error('Error in GetDataSet:', error);
                res.status(500).json({ message: 'Internal Server Error' });
            }
        };
        this.insertAsync = async (req, res) => {
            try {
                const farmData = req.body;
                const command = new createDataSetCommand_1.CreateDataSetCommand(this._dataSetRepository);
                command.dataSetData = farmData;
                const createdFarm = await command.executeAsync();
                res.status(201).json(createdFarm);
            }
            catch (error) {
                console.error('Error in inserting to dataset:', error);
                res.status(500).json({ message: 'Internal Server Error' });
            }
        };
    }
}
exports.DataSetController = DataSetController;
