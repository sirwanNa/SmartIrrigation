"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SensorLogRepository = void 0;
const list_1 = require("../../share/utilities/list");
class SensorLogRepository {
    constructor() {
        this.SensorLogs = [];
    }
    async getSensorLogAsync(id) {
        const SensorLog = this.SensorLogs.find(f => f.id === id);
        if (!SensorLog) {
            throw new Error(`SensorLog with ID ${id} not found`);
        }
        return SensorLog;
    }
    async getSensorLogsListAsync(sensorId) {
        const list = new list_1.List();
        return list;
    }
    async createAsync(SensorLog) {
        this.SensorLogs.push(SensorLog);
        return true;
    }
}
exports.SensorLogRepository = SensorLogRepository;
