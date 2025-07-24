"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteSensorCommand = void 0;
class DeleteSensorCommand {
    constructor(uow, sensorRepository) {
        this.uow = uow;
        this.sensorRepository = sensorRepository;
    }
    async executeAsync() {
        if (this.sensorId === undefined)
            throw new Error('Id is undefined');
        this.uow.start();
        let result = await this.sensorRepository.removeAsync(this.sensorId);
        this.uow.complete();
        return result;
    }
}
exports.DeleteSensorCommand = DeleteSensorCommand;
