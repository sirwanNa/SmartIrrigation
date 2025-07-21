"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataSetRepository = void 0;
const list_1 = require("../../share/utilities/list");
const baseRepository_1 = require("./baseRepository");
class DataSetRepository extends baseRepository_1.BaseRepository {
    constructor(uow) {
        super(uow, 'dataSet');
    }
    fromDTO(dto) {
        const { id, createdDate, soilType, cropType, landSlope, month, temperature, estimated_Time } = dto;
        return { id, createdDate, soilType, cropType, landSlope, month, temperature, estimated_Time };
    }
    async getDataSetAsync() {
        const entities = await this.getAll();
        const list = new list_1.List(entities);
        return list;
    }
    async createAsync(dataSet) {
        const existing = await this.getById(dataSet.id);
        if (existing)
            return false;
        const entity = this.fromDTO(dataSet);
        return await this.create(entity);
    }
}
exports.DataSetRepository = DataSetRepository;
