"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetSensorsListCommand = void 0;
class GetSensorsListCommand {
    constructor(sensorRepository, fieldId) {
        this.sensorRepository = sensorRepository;
        this.fieldId = fieldId;
    }
    executeAsync() {
        return this.sensorRepository.getSensorsListAsync(this.fieldId);
    }
}
exports.GetSensorsListCommand = GetSensorsListCommand;
