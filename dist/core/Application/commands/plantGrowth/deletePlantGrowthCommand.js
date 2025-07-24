"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeletePlantGrowthCommand = void 0;
class DeletePlantGrowthCommand {
    constructor(uow, plantGrowthRepository) {
        this.uow = uow;
        this.plantGrowthRepository = plantGrowthRepository;
    }
    async executeAsync() {
        if (this.plantGrowthId === undefined)
            throw new Error('Id is undefined');
        this.uow.start();
        let result = await this.plantGrowthRepository.removeAsync(this.plantGrowthId);
        this.uow.complete();
        return result;
    }
}
exports.DeletePlantGrowthCommand = DeletePlantGrowthCommand;
