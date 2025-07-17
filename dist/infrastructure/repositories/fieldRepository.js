"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FieldRepository = void 0;
const list_1 = require("../../share/utilities/list");
const baseRepository_1 = require("./baseRepository");
class FieldRepository extends baseRepository_1.BaseRepository {
    constructor(uow) {
        super(uow, 'fields');
    }
    toDTO(entity) {
        const { id, name, createdDate, cropType, soilType, areaSize, latitude, longitude, farmId, cultivationDate } = entity;
        return { id, name, createdDate, cropType, soilType, areaSize, latitude, longitude, farmId, cultivationDate };
    }
    fromDTO(dto) {
        const { id, name, createdDate, cropType, soilType, areaSize, latitude, longitude, farmId, cultivationDate } = dto;
        return { id, name, createdDate, cropType, soilType, areaSize, latitude, longitude, farmId, cultivationDate };
    }
    async getFieldAsync(id) {
        const entity = await this.getById(id);
        if (!entity)
            throw new Error(`Field with ID ${id} not found`);
        return this.toDTO(entity);
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
        const entity = this.fromDTO(field);
        return await this.create(entity);
    }
    async updateAsync(field) {
        await this.checkObjectIsExist(field.id);
        const entity = this.fromDTO(field);
        return await this.update(entity);
    }
    async removeAsync(id) {
        await this.checkObjectIsExist(id);
        return await this.delete(id);
    }
}
exports.FieldRepository = FieldRepository;
