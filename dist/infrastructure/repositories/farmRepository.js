"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FarmRepository = void 0;
const list_1 = require("../../share/utilities/list");
class FarmRepository {
    constructor() {
        this.farms = [];
    }
    getFarm(id) {
        const farm = this.farms.find(f => f.farmId === id);
        if (!farm) {
            throw new Error(`Farm with ID ${id} not found`);
        }
        return farm;
    }
    getFarmsList() {
        return new list_1.List();
    }
    create(farm) {
        const exists = this.farms.some(f => f.farmId === farm.farmId);
        if (exists)
            return false;
        this.farms.push(farm);
        return true;
    }
    update(farm) {
        const index = this.farms.findIndex(f => f.farmId === farm.farmId);
        if (index === -1)
            return false;
        this.farms[index] = farm;
        return true;
    }
    remove(id) {
        const index = this.farms.findIndex(f => f.farmId === id);
        if (index === -1)
            return false;
        this.farms.splice(index, 1);
        return true;
    }
}
exports.FarmRepository = FarmRepository;
