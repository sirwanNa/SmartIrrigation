"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IrrigationLogRepository = void 0;
const list_1 = require("../../share/utilities/list");
const baseRepository_1 = require("./baseRepository");
const mapper_1 = require("../../share/utilities/mapper");
class IrrigationLogRepository extends baseRepository_1.BaseRepository {
    constructor(context) {
        super(context, 'irrigationLogs');
    }
    async getIrrigationLogAsync(id) {
        const entity = await this.getById(id);
        if (!entity)
            throw new Error(`IrrigationLog with ID ${id} not found`);
        return mapper_1.Mapper.Map(entity);
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
        const entity = mapper_1.Mapper.Map(iIrrigationLog);
        return await this.create(entity);
    }
}
exports.IrrigationLogRepository = IrrigationLogRepository;
