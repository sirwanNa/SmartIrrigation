"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlantGrowthController = void 0;
const getPlantGrowthCommand_1 = require("../../core/application/commands/plantGrowth/getPlantGrowthCommand");
const getPlantGrowthListCommand_1 = require("../../core/application/commands/plantGrowth/getPlantGrowthListCommand");
const createPlantGrowthCommand_1 = require("../../core/application/commands/plantGrowth/createPlantGrowthCommand");
const updatePlantGrowthCommand_1 = require("../../core/application/commands/plantGrowth/updatePlantGrowthCommand");
const deletePlantGrowthCommand_1 = require("../../core/application/commands/plantGrowth/deletePlantGrowthCommand");
class PlantGrowthController {
    constructor(uow, _plantGrowthRepository) {
        this.uow = uow;
        this._plantGrowthRepository = _plantGrowthRepository;
        this.getPlantGrowthAsync = async (req, res) => {
            try {
                const id = parseInt(req.params.id, 10);
                if (isNaN(id)) {
                    res.status(400).json({ message: 'Invalid PlantGrowth ID' });
                    return;
                }
                const command = new getPlantGrowthCommand_1.GetPlantGrowthCommand(this._plantGrowthRepository);
                command.id = id;
                const result = await command.executeAsync();
                if (!result) {
                    res.status(404).json({ message: 'PlantGrowth not found' });
                    return;
                }
                res.status(200).json(result);
            }
            catch (error) {
                console.error('Error in getPlantGrowth:', error);
                res.status(500).json({ message: 'Internal Server Error' });
            }
        };
        this.getPlantGrowthsListAsync = async (req, res) => {
            try {
                const fieldId = parseInt(req.params.id, 10);
                const command = new getPlantGrowthListCommand_1.GetPlantGrowthListCommand(this._plantGrowthRepository, fieldId);
                const result = await command.executeAsync();
                res.status(200).json(result);
            }
            catch (error) {
                console.error('Error in getPlantGrowthsList:', error);
                res.status(500).json({ message: 'Internal Server Error' });
            }
        };
        this.createPlantGrowthAsync = async (req, res) => {
            try {
                const PlantGrowthData = req.body;
                const command = new createPlantGrowthCommand_1.CreatePlantGrowthCommand(this.uow, this._plantGrowthRepository);
                command.plantGrowthData = PlantGrowthData;
                const createdPlantGrowth = await command.executeAsync();
                res.status(201).json(createdPlantGrowth);
            }
            catch (error) {
                console.error('Error in creating PlantGrowth:', error);
                res.status(500).json({ message: 'Internal Server Error' });
            }
        };
        this.updatePlantGrowthAsync = async (req, res) => {
            try {
                const PlantGrowthData = req.body;
                const command = new updatePlantGrowthCommand_1.UpdatePlantGrowthCommand(this.uow, this._plantGrowthRepository);
                command.plantGrowthData = PlantGrowthData;
                const updatedPlantGrowth = await command.executeAsync();
                res.status(200).json(updatedPlantGrowth);
            }
            catch (error) {
                console.error('Error in updatePlantGrowth:', error);
                res.status(500).json({ message: 'Internal Server Error' });
            }
        };
        this.deletePlantGrowthAsync = async (req, res) => {
            try {
                const PlantGrowthId = parseInt(req.params.id, 10);
                if (isNaN(PlantGrowthId)) {
                    res.status(400).json({ message: 'Invalid PlantGrowth ID' });
                    return;
                }
                const command = new deletePlantGrowthCommand_1.DeletePlantGrowthCommand(this.uow, this._plantGrowthRepository);
                command.plantGrowthId = PlantGrowthId;
                const deleted = await command.executeAsync();
                res.status(204).json(deleted);
            }
            catch (error) {
                console.error('Error in deletePlantGrowth:', error);
                res.status(500).json({ message: 'Internal Server Error' });
            }
        };
    }
}
exports.PlantGrowthController = PlantGrowthController;
