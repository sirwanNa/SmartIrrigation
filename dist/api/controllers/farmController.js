"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FarmController = void 0;
const getFarmCommand_1 = require("../../core/application/commands/farm/getFarmCommand");
const getFarmsListCommand_1 = require("../../core/application/commands/farm/getFarmsListCommand");
const createFarmCommand_1 = require("../../core/application/commands/farm/createFarmCommand");
const updateFarmCommand_1 = require("../../core/application/commands/farm/updateFarmCommand");
const deleteFarmCommand_1 = require("../../core/application/commands/farm/deleteFarmCommand");
class FarmController {
    constructor(uow, _farmRepository) {
        this.uow = uow;
        this._farmRepository = _farmRepository;
        this.getFarmAsync = async (req, res) => {
            try {
                const farmId = parseInt(req.params.id, 10);
                if (isNaN(farmId)) {
                    res.status(400).json({ message: 'Invalid farm ID' });
                    return;
                }
                const command = new getFarmCommand_1.GetFarmCommand(this._farmRepository);
                command.FarmId = farmId;
                const result = await command.executeAsync();
                if (!result) {
                    res.status(404).json({ message: 'Farm not found' });
                    return;
                }
                res.status(200).json(result);
            }
            catch (error) {
                console.error('Error in getFarm:', error);
                res.status(500).json({ message: 'Internal Server Error' });
            }
        };
        this.getFarmsListAsync = async (req, res) => {
            try {
                const command = new getFarmsListCommand_1.GetFarmsListCommand(this._farmRepository);
                const result = await command.executeAsync();
                res.status(200).json(result);
            }
            catch (error) {
                console.error('Error in getFarmsList:', error);
                res.status(500).json({ message: 'Internal Server Error' });
            }
        };
        this.createFarmAsync = async (req, res) => {
            try {
                const farmData = req.body;
                const command = new createFarmCommand_1.CreateFarmCommand(this.uow, this._farmRepository);
                command.farmData = farmData;
                const createdFarm = await command.executeAsync();
                res.status(201).json(createdFarm);
            }
            catch (error) {
                console.error('Error in creating farm:', error);
                res.status(500).json({ message: 'Internal Server Error' });
            }
        };
        this.updateFarmAsync = async (req, res) => {
            try {
                const farmData = req.body;
                const command = new updateFarmCommand_1.UpdateFarmCommand(this.uow, this._farmRepository);
                command.farmData = farmData;
                const updatedFarm = await command.executeAsync();
                res.status(200).json(updatedFarm);
            }
            catch (error) {
                console.error('Error in updateFarm:', error);
                res.status(500).json({ message: 'Internal Server Error' });
            }
        };
        this.deleteFarmAsync = async (req, res) => {
            try {
                const farmId = parseInt(req.params.id, 10);
                if (isNaN(farmId)) {
                    res.status(400).json({ message: 'Invalid farm ID' });
                    return;
                }
                const command = new deleteFarmCommand_1.DeleteFarmCommand(this.uow, this._farmRepository);
                command.FarmId = farmId;
                const deleted = await command.executeAsync();
                res.status(204).json(deleted);
            }
            catch (error) {
                console.error('Error in deleteFarm:', error);
                res.status(500).json({ message: 'Internal Server Error' });
            }
        };
    }
}
exports.FarmController = FarmController;
