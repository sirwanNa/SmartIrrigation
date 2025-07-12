"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetPlantGrowthListCommand = void 0;
class GetPlantGrowthListCommand {
    constructor(plantGrowthRepository, fieldId) {
        this.plantGrowthRepository = plantGrowthRepository;
        this.fieldId = fieldId;
    }
    async executeAsync() {
        return this.plantGrowthRepository.getPlantGrowthListAsync(this.fieldId);
    }
}
exports.GetPlantGrowthListCommand = GetPlantGrowthListCommand;
