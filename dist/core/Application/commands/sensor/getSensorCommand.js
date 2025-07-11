"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetSensorCommand = void 0;
class GetSensorCommand {
    constructor(sensorRepository) {
        this._sensorRepository = sensorRepository;
    }
    executeAsync() {
        if (this.sensorId === undefined)
            throw new Error('Id is undefined');
        return this._sensorRepository.getSensorAsync(this.sensorId);
    }
}
exports.GetSensorCommand = GetSensorCommand;
