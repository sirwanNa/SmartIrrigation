"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SensorRepository = void 0;
const list_1 = require("../../share/utilities/list");
const baseRepository_1 = require("./baseRepository");
const mapper_1 = require("../../share/utilities/mapper");
class SensorRepository extends baseRepository_1.BaseRepository {
    constructor(uow) {
        super(uow, 'sensors');
    }
    async getSensorAsync(id) {
        const entity = await this.getById(id);
        if (!entity)
            throw new Error(`Sensor with ID ${id} not found`);
        return mapper_1.Mapper.Map(entity);
    }
    async getSensorsListAsync(fieldId) {
        const entities = await this.getAll({ fieldId });
        const list = new list_1.List(entities);
        return list;
    }
    async createAsync(sensor) {
        const existing = await this.getById(sensor.id);
        if (existing)
            return false;
        const entity = mapper_1.Mapper.Map(sensor);
        return await this.create(entity);
    }
    async updateAsync(sensor) {
        await this.checkObjectIsExist(sensor.id);
        const entity = mapper_1.Mapper.Map(sensor);
        return await this.update(entity);
    }
    async removeAsync(id) {
        await this.checkObjectIsExist(id);
        return await this.delete(id);
    }
}
exports.SensorRepository = SensorRepository;
