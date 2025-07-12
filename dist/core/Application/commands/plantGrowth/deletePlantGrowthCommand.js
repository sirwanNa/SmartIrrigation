"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeletePlantGrowthCommand = void 0;
class DeletePlantGrowthCommand {
    constructor(PlantGrowthRepository) {
        this._plantGrowthRepository = PlantGrowthRepository;
    }
    executeAsync() {
        if (this.plantGrowthId === undefined)
            throw new Error('Id is undefined');
        return this._plantGrowthRepository.removeAsync(this.plantGrowthId);
    }
}
exports.DeletePlantGrowthCommand = DeletePlantGrowthCommand;
