"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FarmRepository = void 0;
const list_1 = require("../../share/utilities/list");
const baseRepository_1 = require("./baseRepository");
class FarmRepository extends baseRepository_1.BaseRepository {
    constructor(uow) {
        super(uow, 'farms');
    }
    toDTO(entity) {
        const { id, name, createdDate, farmType, irrigationType } = entity;
        return { id, name, createdDate, farmType, irrigationType };
    }
    fromDTO(dto) {
        const { id, name, createdDate, farmType, irrigationType } = dto;
        return { id, name, createdDate, farmType, irrigationType };
    }
    async getFarmAsync(id) {
        const entity = await this.getById(id);
        if (!entity)
            throw new Error(`Farm with ID ${id} not found`);
        return this.toDTO(entity);
    }
    async getFarmsListAsync() {
        const entities = await this.getAll();
        const list = new list_1.List(entities);
        return list;
    }
    async createAsync(farm) {
        const existing = await this.getById(farm.id);
        if (existing)
            return false;
        const entity = this.fromDTO(farm);
        return await this.create(entity);
    }
    async updateAsync(farm) {
        await this.checkObjectIsExist(farm.id);
        const entity = this.fromDTO(farm);
        return await this.update(entity);
    }
    async removeAsync(id) {
        await this.checkObjectIsExist(id);
        return await this.delete(id);
    }
}
exports.FarmRepository = FarmRepository;
