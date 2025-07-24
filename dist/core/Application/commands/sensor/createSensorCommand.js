"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateSensorCommand = void 0;
class CreateSensorCommand {
    constructor(uow, sensorRepository) {
        this.uow = uow;
        this.sensorRepository = sensorRepository;
    }
    async executeAsync() {
        if (!this.sensorData) {
            throw new Error('Sensor data is undefined');
        }
        this.uow.start();
        let result = await this.sensorRepository.createAsync(this.sensorData);
        this.uow.complete();
        return result;
    }
}
exports.CreateSensorCommand = CreateSensorCommand;
