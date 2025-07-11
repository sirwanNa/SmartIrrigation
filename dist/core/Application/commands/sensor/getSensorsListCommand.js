"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetSensorsListCommand = void 0;
class GetSensorsListCommand {
    constructor(sensorRepository) {
        this._sensorRepository = sensorRepository;
    }
    executeAsync() {
        return this._sensorRepository.getSensorsListAsync();
    }
}
exports.GetSensorsListCommand = GetSensorsListCommand;
