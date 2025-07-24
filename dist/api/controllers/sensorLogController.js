"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SensorLogController = void 0;
const getSensorLogCommand_1 = require("../../core/application/commands/sensorLog/getSensorLogCommand");
const getSensorLogsListCommand_1 = require("../../core/application/commands/sensorLog/getSensorLogsListCommand");
const createSensorLogCommand_1 = require("../../core/application/commands/sensorLog/createSensorLogCommand");
class SensorLogController {
    constructor(uow, _sensorLogRepository, _sensorRepository, _irrigationLogRepository, fieldRepository, dataSetRepository) {
        this.uow = uow;
        this._sensorLogRepository = _sensorLogRepository;
        this._sensorRepository = _sensorRepository;
        this._irrigationLogRepository = _irrigationLogRepository;
        this.fieldRepository = fieldRepository;
        this.dataSetRepository = dataSetRepository;
        this.getSensorLogAsync = async (req, res) => {
            try {
                const sensorLogId = parseInt(req.params.id, 10);
                if (isNaN(sensorLogId)) {
                    res.status(400).json({ message: 'Invalid SensorLog ID' });
                    return;
                }
                const command = new getSensorLogCommand_1.GetSensorLogCommand(this._sensorLogRepository);
                command.sensorLogId = sensorLogId;
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
                const sensorId = parseInt(req.params.id, 10);
                const command = new getSensorLogsListCommand_1.GetSensorLogsListCommand(this._sensorLogRepository, sensorId);
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
                const command = new createSensorLogCommand_1.CreateSensorLogCommand(this.uow, this._sensorLogRepository, this._sensorRepository, this._irrigationLogRepository, this.fieldRepository, this.dataSetRepository);
                command.sensorLogData = SensorLogData;
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
