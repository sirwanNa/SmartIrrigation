"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteFieldCommand = void 0;
class DeleteFieldCommand {
    constructor(fieldRepository) {
        this._fieldRepository = fieldRepository;
    }
    executeAsync() {
        if (this.fieldId === undefined)
            throw new Error('Id is undefined');
        return this._fieldRepository.removeAsync(this.fieldId);
    }
}
exports.DeleteFieldCommand = DeleteFieldCommand;
