"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FarmRepository = void 0;
const list_1 = require("../../share/utilities/list");
class FarmRepository {
    constructor() {
        this.farms = [];
    }
    async getFarmAsync(id) {
        const farm = this.farms.find(f => f.farmId === id);
        if (!farm) {
            throw new Error(`Farm with ID ${id} not found`);
        }
        return farm;
    }
    async getFarmsListAsync() {
        const list = new list_1.List();
        return list;
    }
    async createAsync(farm) {
        const exists = this.farms.some(f => f.farmId === farm.farmId);
        if (exists)
            return false;
        this.farms.push(farm);
        return true;
    }
    async updateAsync(farm) {
        const index = this.farms.findIndex(f => f.farmId === farm.farmId);
        if (index === -1)
            return false;
        this.farms[index] = farm;
        return true;
    }
    async removeAsync(id) {
        const index = this.farms.findIndex(f => f.farmId === id);
        if (index === -1)
            return false;
        this.farms.splice(index, 1);
        return true;
    }
}
exports.FarmRepository = FarmRepository;
