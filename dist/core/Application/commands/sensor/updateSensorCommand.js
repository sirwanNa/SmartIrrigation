"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateSensorCommand = void 0;
class UpdateSensorCommand {
    constructor(SensorRepository) {
        this._sensorRepository = SensorRepository;
    }
    async executeAsync() {
        if (!this.sensorData) {
            throw new Error('Sensor data is undefined');
        }
        return await this._sensorRepository.updateAsync(this.sensorData);
    }
}
exports.UpdateSensorCommand = UpdateSensorCommand;
