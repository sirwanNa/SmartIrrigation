"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetSensorLogsListCommand = void 0;
class GetSensorLogsListCommand {
    constructor(_sensorLogRepository, sensorId) {
        this._sensorLogRepository = _sensorLogRepository;
        this.sensorId = sensorId;
    }
    executeAsync() {
        return this._sensorLogRepository.getSensorLogsListAsync(this.sensorId);
    }
}
exports.GetSensorLogsListCommand = GetSensorLogsListCommand;
