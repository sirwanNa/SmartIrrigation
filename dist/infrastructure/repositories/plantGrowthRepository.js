"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlantGrowthRepository = void 0;
const list_1 = require("../../share/utilities/list");
const baseRepository_1 = require("./baseRepository");
const mapper_1 = require("../../share/utilities/mapper");
class PlantGrowthRepository extends baseRepository_1.BaseRepository {
    constructor(context) {
        super(context, 'plantGrowth');
    }
    async getPlantGrowthAsync(id) {
        const entity = await this.getById(id);
        if (!entity)
            throw new Error(`PlantGrowth with ID ${id} not found`);
        return mapper_1.Mapper.Map(entity);
    }
    async getPlantGrowthListAsync(fieldId) {
        var filter = { fieldId };
        const entities = await this.getAll(filter);
        const list = new list_1.List(entities);
        return list;
    }
    async createAsync(plantGrowth) {
        const existing = await this.getById(plantGrowth.id);
        if (existing)
            return false;
        const entity = mapper_1.Mapper.Map(plantGrowth);
        return await this.create(entity);
    }
    async updateAsync(plantGrowth) {
        await this.checkObjectIsExist(plantGrowth.id);
        const entity = mapper_1.Mapper.Map(plantGrowth);
        return await this.update(entity);
    }
    async removeAsync(id) {
        await this.checkObjectIsExist(id);
        return await this.delete(id);
    }
}
exports.PlantGrowthRepository = PlantGrowthRepository;
