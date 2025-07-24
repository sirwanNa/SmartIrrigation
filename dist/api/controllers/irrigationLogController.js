"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IrrigationLogController = void 0;
const getIrrigationLogCommand_1 = require("../../core/application/commands/irrigationLog/getIrrigationLogCommand");
const getIrrigationLogsListCommand_1 = require("../../core/application/commands/irrigationLog/getIrrigationLogsListCommand");
const createIrrigationLogCommand_1 = require("../../core/application/commands/irrigationLog/createIrrigationLogCommand");
class IrrigationLogController {
    constructor(uow, _IrrigationLogRepository) {
        this.uow = uow;
        this._IrrigationLogRepository = _IrrigationLogRepository;
        this.getIrrigationLogAsync = async (req, res) => {
            try {
                const id = parseInt(req.params.id, 10);
                if (isNaN(id)) {
                    res.status(400).json({ message: 'Invalid IrrigationLog ID' });
                    return;
                }
                const command = new getIrrigationLogCommand_1.GetIrrigationLogCommand(this._IrrigationLogRepository);
                command.id = id;
                const result = await command.executeAsync();
                if (!result) {
                    res.status(404).json({ message: 'IrrigationLog not found' });
                    return;
                }
                res.status(200).json(result);
            }
            catch (error) {
                console.error('Error in getIrrigationLog:', error);
                res.status(500).json({ message: 'Internal Server Error' });
            }
        };
        this.getIrrigationLogsListAsync = async (req, res) => {
            try {
                const IrrigationId = parseInt(req.params.id, 10);
                const command = new getIrrigationLogsListCommand_1.GetIrrigationLogsListCommand(this._IrrigationLogRepository, IrrigationId);
                const result = await command.executeAsync();
                res.status(200).json(result);
            }
            catch (error) {
                console.error('Error in getIrrigationLogsList:', error);
                res.status(500).json({ message: 'Internal Server Error' });
            }
        };
        this.createIrrigationLogAsync = async (req, res) => {
            try {
                const irrigationLogData = req.body;
                const command = new createIrrigationLogCommand_1.CreateIrrigationLogCommand(this.uow, this._IrrigationLogRepository);
                command.irrigationLogData = irrigationLogData;
                const createdIrrigationLog = await command.executeAsync();
                res.status(201).json(createdIrrigationLog);
            }
            catch (error) {
                console.error('Error in creating IrrigationLog:', error);
                res.status(500).json({ message: 'Internal Server Error' });
            }
        };
    }
}
exports.IrrigationLogController = IrrigationLogController;
