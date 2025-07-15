"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IrrigationLogRepository = void 0;
const list_1 = require("../../share/utilities/list");
class IrrigationLogRepository {
    constructor() {
        this.irrigationLogs = [];
    }
    async getIrrigationLogAsync(id) {
        const IrrigationLog = this.irrigationLogs.find(f => f.id === id);
        if (!IrrigationLog) {
            throw new Error(`IrrigationLog with ID ${id} not found`);
        }
        return IrrigationLog;
    }
    async getIrrigationLogsListAsync(irrigationId) {
        const list = new list_1.List();
        return list;
    }
    async createAsync(IrrigationLog) {
        this.irrigationLogs.push(IrrigationLog);
        return true;
    }
}
exports.IrrigationLogRepository = IrrigationLogRepository;
