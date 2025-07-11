"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetSensorLogCommand = void 0;
class GetSensorLogCommand {
    constructor(sensorLogRepository) {
        this._sensorLogRepository = sensorLogRepository;
    }
    executeAsync() {
        if (this.sensorLogId === undefined)
            throw new Error('Id is undefined');
        return this._sensorLogRepository.getSensorLogAsync(this.sensorLogId);
    }
}
exports.GetSensorLogCommand = GetSensorLogCommand;
