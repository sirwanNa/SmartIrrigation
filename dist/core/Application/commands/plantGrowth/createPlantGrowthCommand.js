"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreatePlantGrowthCommand = void 0;
class CreatePlantGrowthCommand {
    constructor(uow, plantGrowthRepository) {
        this.uow = uow;
        this.plantGrowthRepository = plantGrowthRepository;
        this.plantGrowthRepository = plantGrowthRepository;
    }
    async executeAsync() {
        if (!this.plantGrowthData) {
            throw new Error('PlantGrowth data is undefined');
        }
        this.uow.start();
        let result = await this.plantGrowthRepository.createAsync(this.plantGrowthData);
        this.uow.complete();
        return result;
    }
}
exports.CreatePlantGrowthCommand = CreatePlantGrowthCommand;
