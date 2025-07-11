"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteSensorCommand = void 0;
class DeleteSensorCommand {
    constructor(sensorRepository) {
        this._sensorRepository = sensorRepository;
    }
    executeAsync() {
        if (this.sensorId === undefined)
            throw new Error('Id is undefined');
        return this._sensorRepository.removeAsync(this.sensorId);
    }
}
exports.DeleteSensorCommand = DeleteSensorCommand;
