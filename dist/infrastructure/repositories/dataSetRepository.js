"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataSetRepository = void 0;
const list_1 = require("../../share/utilities/list");
const baseRepository_1 = require("./baseRepository");
const mapper_1 = require("../../share/utilities/mapper");
class DataSetRepository extends baseRepository_1.BaseRepository {
    constructor(context) {
        super(context, 'dataSet');
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
        const entity = mapper_1.Mapper.Map(dataSet);
        return await this.create(entity);
    }
}
exports.DataSetRepository = DataSetRepository;
