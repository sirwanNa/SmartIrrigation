"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FieldRepository = void 0;
const list_1 = require("../../share/utilities/list");
class FieldRepository {
    constructor() {
        this.Fields = [];
    }
    async getFieldAsync(id) {
        const Field = this.Fields.find(f => f.id === id);
        if (!Field) {
            throw new Error(`Field with ID ${id} not found`);
        }
        return Field;
    }
    async getFieldsListAsync(farmdId) {
        const list = new list_1.List();
        return list;
    }
    async createAsync(Field) {
        const exists = this.Fields.some(f => f.id === Field.id);
        if (exists)
            return false;
        this.Fields.push(Field);
        return true;
    }
    async updateAsync(Field) {
        const index = this.Fields.findIndex(f => f.id === Field.id);
        if (index === -1)
            return false;
        this.Fields[index] = Field;
        return true;
    }
    async removeAsync(id) {
        const index = this.Fields.findIndex(f => f.id === id);
        if (index === -1)
            return false;
        this.Fields.splice(index, 1);
        return true;
    }
}
exports.FieldRepository = FieldRepository;
