"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IrrigationLogRepository = void 0;
const list_1 = require("../../share/utilities/list");
const baseRepository_1 = require("./baseRepository");
class IrrigationLogRepository extends baseRepository_1.BaseRepository {
    constructor(uow) {
        super(uow, 'irrigationLogs');
    }
    toDTO(entity) {
        const { id, createdDate, fieldId, startDate, endDate } = entity;
        return { id, createdDate, fieldId, startDate, endDate };
    }
    fromDTO(dto) {
        const { id, createdDate, fieldId, startDate, endDate } = dto;
        return { id, createdDate, fieldId, startDate, endDate };
    }
    async getIrrigationLogAsync(id) {
        const entity = await this.getById(id);
        if (!entity)
            throw new Error(`IrrigationLog with ID ${id} not found`);
        return this.toDTO(entity);
    }
    async getIrrigationLogsListAsync(fieldId) {
        var filter = { fieldId };
        const entities = await this.getAll(filter);
        const list = new list_1.List(entities);
        return list;
    }
    async createAsync(iIrrigationLog) {
        const existing = await this.getById(iIrrigationLog.id);
        if (existing)
            return false;
        const entity = this.fromDTO(iIrrigationLog);
        return await this.create(entity);
    }
}
exports.IrrigationLogRepository = IrrigationLogRepository;
