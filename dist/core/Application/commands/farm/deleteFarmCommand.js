"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteFarmCommand = void 0;
class DeleteFarmCommand {
    constructor(uow, farmRepository) {
        this.uow = uow;
        this.farmRepository = farmRepository;
    }
    async executeAsync() {
        if (this.FarmId === undefined)
            throw new Error('Id is undefined');
        this.uow.start();
        let result = await this.farmRepository.removeAsync(this.FarmId);
        this.uow.complete();
        return result;
    }
}
exports.DeleteFarmCommand = DeleteFarmCommand;
