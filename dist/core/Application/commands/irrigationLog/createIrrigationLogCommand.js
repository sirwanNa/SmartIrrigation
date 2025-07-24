"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateIrrigationLogCommand = void 0;
class CreateIrrigationLogCommand {
    constructor(uow, irrigationLogRepository) {
        this.uow = uow;
        this.irrigationLogRepository = irrigationLogRepository;
    }
    async executeAsync() {
        if (!this.irrigationLogData) {
            throw new Error('IrrigationLog data is undefined');
        }
        this.uow.start();
        let result = await this.irrigationLogRepository.createAsync(this.irrigationLogData);
        this.uow.complete();
        return result;
    }
}
exports.CreateIrrigationLogCommand = CreateIrrigationLogCommand;
