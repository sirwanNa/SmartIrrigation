"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateIrrigationLogCommand = void 0;
class CreateIrrigationLogCommand {
    constructor(irrigationLogRepository) {
        this._irrigationLogRepository = irrigationLogRepository;
    }
    async executeAsync() {
        if (!this.irrigationLogData) {
            throw new Error('IrrigationLog data is undefined');
        }
        return await this._irrigationLogRepository.createAsync(this.irrigationLogData);
    }
}
exports.CreateIrrigationLogCommand = CreateIrrigationLogCommand;
