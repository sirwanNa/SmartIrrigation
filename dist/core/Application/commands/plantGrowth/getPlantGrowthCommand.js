"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetPlantGrowthCommand = void 0;
class GetPlantGrowthCommand {
    constructor(plantGrowthRepository) {
        this._plantGrowthRepository = plantGrowthRepository;
    }
    executeAsync() {
        if (this.id === undefined)
            throw new Error('Id is undefined');
        return this._plantGrowthRepository.getPlantGrowthAsync(this.id);
    }
}
exports.GetPlantGrowthCommand = GetPlantGrowthCommand;
