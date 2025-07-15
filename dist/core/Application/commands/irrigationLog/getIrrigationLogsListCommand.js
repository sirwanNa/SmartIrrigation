"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetIrrigationLogsListCommand = void 0;
class GetIrrigationLogsListCommand {
    constructor(_irrigationLogRepository, fieldId) {
        this._irrigationLogRepository = _irrigationLogRepository;
        this.fieldId = fieldId;
    }
    executeAsync() {
        return this._irrigationLogRepository.getIrrigationLogsListAsync(this.fieldId);
    }
}
exports.GetIrrigationLogsListCommand = GetIrrigationLogsListCommand;
