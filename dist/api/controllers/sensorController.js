"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SensorController = void 0;
const getSensorCommand_1 = require("../../core/application/commands/sensor/getSensorCommand");
const getSensorsListCommand_1 = require("../../core/application/commands/sensor/getSensorsListCommand");
const createSensorCommand_1 = require("../../core/application/commands/sensor/createSensorCommand");
const updateSensorCommand_1 = require("../../core/application/commands/sensor/updateSensorCommand");
const deleteSensorCommand_1 = require("../../core/application/commands/sensor/deleteSensorCommand");
class SensorController {
    constructor(_SensorRepository) {
        this._SensorRepository = _SensorRepository;
        this.getSensorAsync = async (req, res) => {
            try {
                const SensorId = parseInt(req.params.id, 10);
                if (isNaN(SensorId)) {
                    res.status(400).json({ message: 'Invalid Sensor ID' });
                    return;
                }
                const command = new getSensorCommand_1.GetSensorCommand(this._SensorRepository);
                command.sensorId = SensorId;
                const result = await command.executeAsync();
                if (!result) {
                    res.status(404).json({ message: 'Sensor not found' });
                    return;
                }
                res.status(200).json(result);
            }
            catch (error) {
                console.error('Error in getSensor:', error);
                res.status(500).json({ message: 'Internal Server Error' });
            }
        };
        this.getSensorsListAsync = async (req, res) => {
            try {
                const command = new getSensorsListCommand_1.GetSensorsListCommand(this._SensorRepository);
                const result = await command.executeAsync();
                res.status(200).json(result);
            }
            catch (error) {
                console.error('Error in getSensorsList:', error);
                res.status(500).json({ message: 'Internal Server Error' });
            }
        };
        this.createSensorAsync = async (req, res) => {
            try {
                const SensorData = req.body;
                const command = new createSensorCommand_1.CreateSensorCommand(this._SensorRepository);
                command.sensorData = SensorData;
                const createdSensor = await command.executeAsync();
                res.status(201).json(createdSensor);
            }
            catch (error) {
                console.error('Error in creating Sensor:', error);
                res.status(500).json({ message: 'Internal Server Error' });
            }
        };
        this.updateSensorAsync = async (req, res) => {
            try {
                const SensorData = req.body;
                const command = new updateSensorCommand_1.UpdateSensorCommand(this._SensorRepository);
                command.sensorData = SensorData;
                const updatedSensor = await command.executeAsync();
                res.status(200).json(updatedSensor);
            }
            catch (error) {
                console.error('Error in updateSensor:', error);
                res.status(500).json({ message: 'Internal Server Error' });
            }
        };
        this.deleteSensorAsync = async (req, res) => {
            try {
                const SensorId = parseInt(req.params.id, 10);
                if (isNaN(SensorId)) {
                    res.status(400).json({ message: 'Invalid Sensor ID' });
                    return;
                }
                const command = new deleteSensorCommand_1.DeleteSensorCommand(this._SensorRepository);
                command.sensorId = SensorId;
                const deleted = await command.executeAsync();
                res.status(204).json(deleted);
            }
            catch (error) {
                console.error('Error in deleteSensor:', error);
                res.status(500).json({ message: 'Internal Server Error' });
            }
        };
    }
}
exports.SensorController = SensorController;
