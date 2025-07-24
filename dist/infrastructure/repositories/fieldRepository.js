"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FieldRepository = void 0;
const list_1 = require("../../share/utilities/list");
const baseRepository_1 = require("./baseRepository");
const mapper_1 = require("../../share/utilities/mapper");
class FieldRepository extends baseRepository_1.BaseRepository {
    constructor(context) {
        super(context, 'fields');
    }
    async getFieldAsync(id) {
        const entity = await this.getById(id);
        if (!entity)
            throw new Error(`Field with ID ${id} not found`);
        return mapper_1.Mapper.Map(entity);
    }
    async getFieldsListAsync(farmdId) {
        var filter = { farmdId };
        const entities = await this.getAll(filter);
        const list = new list_1.List(entities);
        return list;
    }
    async createAsync(field) {
        const existing = await this.getById(field.id);
        if (existing)
            return false;
        const entity = mapper_1.Mapper.Map(field);
        return await this.create(entity);
    }
    async updateAsync(field) {
        await this.checkObjectIsExist(field.id);
        const entity = mapper_1.Mapper.Map(field);
        return await this.update(entity);
    }
    async removeAsync(id) {
        await this.checkObjectIsExist(id);
        return await this.delete(id);
    }
}
exports.FieldRepository = FieldRepository;
