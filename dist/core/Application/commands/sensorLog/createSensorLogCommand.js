"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateSensorLogCommand = void 0;
class CreateSensorLogCommand {
    constructor(SensorLogRepository) {
        this._SensorLogRepository = SensorLogRepository;
    }
    async executeAsync() {
        if (!this.SensorLogData) {
            throw new Error('SensorLog data is undefined');
        }
        return await this._SensorLogRepository.createAsync(this.SensorLogData);
    }
}
exports.CreateSensorLogCommand = CreateSensorLogCommand;
