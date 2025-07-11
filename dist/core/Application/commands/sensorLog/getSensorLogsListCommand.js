"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetSensorLogsListCommand = void 0;
class GetSensorLogsListCommand {
    constructor(sensorLogRepository) {
        this._sensorLogRepository = sensorLogRepository;
    }
    executeAsync() {
        return this._sensorLogRepository.getSensorLogsListAsync();
    }
}
exports.GetSensorLogsListCommand = GetSensorLogsListCommand;
