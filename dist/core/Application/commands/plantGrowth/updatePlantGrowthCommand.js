"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdatePlantGrowthCommand = void 0;
class UpdatePlantGrowthCommand {
    constructor(uow, plantGrowthRepository) {
        this.uow = uow;
        this.plantGrowthRepository = plantGrowthRepository;
    }
    async executeAsync() {
        if (!this.plantGrowthData) {
            throw new Error('PlantGrowth data is undefined');
        }
        this.uow.start();
        let result = await this.plantGrowthRepository.updateAsync(this.plantGrowthData);
        this.uow.complete();
        return result;
    }
}
exports.UpdatePlantGrowthCommand = UpdatePlantGrowthCommand;
