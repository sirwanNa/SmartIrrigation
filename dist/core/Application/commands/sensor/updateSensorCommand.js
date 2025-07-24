"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateSensorCommand = void 0;
class UpdateSensorCommand {
    constructor(uow, sensorRepository) {
        this.uow = uow;
        this.sensorRepository = sensorRepository;
    }
    async executeAsync() {
        if (!this.sensorData) {
            throw new Error('Sensor data is undefined');
        }
        this.uow.start();
        let result = await this.sensorRepository.updateAsync(this.sensorData);
        this.uow.complete();
        return result;
    }
}
exports.UpdateSensorCommand = UpdateSensorCommand;
