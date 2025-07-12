"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreatePlantGrowthCommand = void 0;
class CreatePlantGrowthCommand {
    constructor(plantGrowthRepository) {
        this._plantGrowthRepository = plantGrowthRepository;
    }
    async executeAsync() {
        if (!this.plantGrowthData) {
            throw new Error('PlantGrowth data is undefined');
        }
        return await this._plantGrowthRepository.createAsync(this.plantGrowthData);
    }
}
exports.CreatePlantGrowthCommand = CreatePlantGrowthCommand;
