"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetFieldsListCommand = void 0;
class GetFieldsListCommand {
    constructor(fieldRepository) {
        this._fieldRepository = fieldRepository;
    }
    executeAsync() {
        return this._fieldRepository.getFieldsListAsync();
    }
}
exports.GetFieldsListCommand = GetFieldsListCommand;
