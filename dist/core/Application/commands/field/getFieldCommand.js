"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetFieldCommand = void 0;
class GetFieldCommand {
    constructor(fieldRepository) {
        this._fieldRepository = fieldRepository;
    }
    executeAsync() {
        if (this.fieldId === undefined)
            throw new Error('Id is undefined');
        return this._fieldRepository.getFieldAsync(this.fieldId);
    }
}
exports.GetFieldCommand = GetFieldCommand;
