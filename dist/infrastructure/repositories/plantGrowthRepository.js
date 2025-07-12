"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlantGrowthRepository = void 0;
const list_1 = require("../../share/utilities/list");
class PlantGrowthRepository {
    constructor() {
        this.PlantGrowths = [];
    }
    async getPlantGrowthAsync(id) {
        const PlantGrowth = this.PlantGrowths.find(f => f.id === id);
        if (!PlantGrowth) {
            throw new Error(`PlantGrowth with ID ${id} not found`);
        }
        return PlantGrowth;
    }
    async getPlantGrowthListAsync() {
        const list = new list_1.List();
        return list;
    }
    async createAsync(PlantGrowth) {
        const exists = this.PlantGrowths.some(f => f.id === PlantGrowth.id);
        if (exists)
            return false;
        this.PlantGrowths.push(PlantGrowth);
        return true;
    }
    async updateAsync(PlantGrowth) {
        const index = this.PlantGrowths.findIndex(f => f.id === PlantGrowth.id);
        if (index === -1)
            return false;
        this.PlantGrowths[index] = PlantGrowth;
        return true;
    }
    async removeAsync(id) {
        const index = this.PlantGrowths.findIndex(f => f.id === id);
        if (index === -1)
            return false;
        this.PlantGrowths.splice(index, 1);
        return true;
    }
}
exports.PlantGrowthRepository = PlantGrowthRepository;
