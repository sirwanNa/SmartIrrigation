"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetFieldsListCommand = void 0;
class GetFieldsListCommand {
    constructor(fieldRepository, farmId) {
        this.fieldRepository = fieldRepository;
        this.farmId = farmId;
    }
    async executeAsync() {
        return this.fieldRepository.getFieldsListAsync(this.farmId);
    }
}
exports.GetFieldsListCommand = GetFieldsListCommand;
