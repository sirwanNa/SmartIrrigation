"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdatePlantGrowthCommand = void 0;
class UpdatePlantGrowthCommand {
    constructor(PlantGrowthRepository) {
        this._plantGrowthRepository = PlantGrowthRepository;
    }
    async executeAsync() {
        if (!this.plantGrowthData) {
            throw new Error('PlantGrowth data is undefined');
        }
        return await this._plantGrowthRepository.updateAsync(this.plantGrowthData);
    }
}
exports.UpdatePlantGrowthCommand = UpdatePlantGrowthCommand;
