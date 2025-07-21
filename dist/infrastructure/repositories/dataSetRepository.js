"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataSetRepository = void 0;
const list_1 = require("../../share/utilities/list");
const baseRepository_1 = require("./baseRepository");
class DataSetRepository extends baseRepository_1.BaseRepository {
    async getDataSetAsync() {
        const entities = await this.getAll();
        const list = new list_1.List(entities);
        return list;
    }
}
exports.DataSetRepository = DataSetRepository;
