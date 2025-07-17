"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SensorLogRepository = void 0;
const list_1 = require("../../share/utilities/list");
const baseRepository_1 = require("./baseRepository");
class SensorLogRepository extends baseRepository_1.BaseRepository {
    constructor(uow) {
        super(uow, 'sensorLogs');
    }
    toDTO(entity) {
        const { id, createdDate, sensorId, value, batteryLevel, signalStrength } = entity;
        return { id, createdDate, sensorId, value, batteryLevel, signalStrength };
    }
    fromDTO(dto) {
        const { id, createdDate, sensorId, value, batteryLevel, signalStrength } = dto;
        return { id, createdDate, sensorId, value, batteryLevel, signalStrength };
    }
    async getSensorLogAsync(id) {
        const entity = await this.getById(id);
        if (!entity)
            throw new Error(`SensorLog with ID ${id} not found`);
        return this.toDTO(entity);
    }
    async getSensorLogsListAsync(sensorId) {
        var filter = { sensorId };
        const entities = await this.getAll(filter);
        const list = new list_1.List(entities);
        return list;
    }
    async createAsync(sensorLog) {
        const existing = await this.getById(sensorLog.id);
        if (existing)
            return false;
        const entity = this.fromDTO(sensorLog);
        return await this.create(entity);
    }
}
exports.SensorLogRepository = SensorLogRepository;
