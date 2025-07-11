"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SensorLogController = void 0;
const getSensorLogCommand_1 = require("../../core/Application/commands/sensorLog/getSensorLogCommand");
const getSensorLogsListCommand_1 = require("../../core/Application/commands/sensorLog/getSensorLogsListCommand");
const createSensorLogCommand_1 = require("../../core/Application/commands/sensorLog/createSensorLogCommand");
class SensorLogController {
    constructor(_SensorLogRepository) {
        this._SensorLogRepository = _SensorLogRepository;
        this.getSensorLogAsync = async (req, res) => {
            try {
                const SensorLogId = parseInt(req.params.id, 10);
                if (isNaN(SensorLogId)) {
                    res.status(400).json({ message: 'Invalid SensorLog ID' });
                    return;
                }
                const command = new getSensorLogCommand_1.GetSensorLogCommand(this._SensorLogRepository);
                command.sensorLogId = SensorLogId;
                const result = await command.executeAsync();
                if (!result) {
                    res.status(404).json({ message: 'SensorLog not found' });
                    return;
                }
                res.status(200).json(result);
            }
            catch (error) {
                console.error('Error in getSensorLog:', error);
                res.status(500).json({ message: 'Internal Server Error' });
            }
        };
        this.getSensorLogsListAsync = async (req, res) => {
            try {
                const command = new getSensorLogsListCommand_1.GetSensorLogsListCommand(this._SensorLogRepository);
                const result = await command.executeAsync();
                res.status(200).json(result);
            }
            catch (error) {
                console.error('Error in getSensorLogsList:', error);
                res.status(500).json({ message: 'Internal Server Error' });
            }
        };
        this.createSensorLogAsync = async (req, res) => {
            try {
                const SensorLogData = req.body;
                const command = new createSensorLogCommand_1.CreateSensorLogCommand(this._SensorLogRepository);
                command.SensorLogData = SensorLogData;
                const createdSensorLog = await command.executeAsync();
                res.status(201).json(createdSensorLog);
            }
            catch (error) {
                console.error('Error in creating SensorLog:', error);
                res.status(500).json({ message: 'Internal Server Error' });
            }
        };
    }
}
exports.SensorLogController = SensorLogController;
