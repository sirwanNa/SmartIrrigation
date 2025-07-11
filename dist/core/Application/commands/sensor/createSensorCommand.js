"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateSensorCommand = void 0;
class CreateSensorCommand {
    constructor(sensorRepository) {
        this._sensorRepository = sensorRepository;
    }
    async executeAsync() {
        if (!this.sensorData) {
            throw new Error('Sensor data is undefined');
        }
        return await this._sensorRepository.createAsync(this.sensorData);
    }
}
exports.CreateSensorCommand = CreateSensorCommand;
