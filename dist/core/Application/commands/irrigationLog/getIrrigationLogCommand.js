"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetIrrigationLogCommand = void 0;
class GetIrrigationLogCommand {
    constructor(irrigationLogRepository) {
        this._irrigationLogRepository = irrigationLogRepository;
    }
    executeAsync() {
        if (this.irrigationLogId === undefined)
            throw new Error('Id is undefined');
        return this._irrigationLogRepository.getIrrigationLogAsync(this.irrigationLogId);
    }
}
exports.GetIrrigationLogCommand = GetIrrigationLogCommand;
