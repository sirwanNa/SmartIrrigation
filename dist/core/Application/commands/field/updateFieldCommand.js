"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateFieldCommand = void 0;
class UpdateFieldCommand {
    constructor(fieldRepository) {
        this._fieldRepository = fieldRepository;
    }
    async executeAsync() {
        if (!this.fieldData) {
            throw new Error('Field data is undefined');
        }
        return await this._fieldRepository.updateAsync(this.fieldData);
    }
}
exports.UpdateFieldCommand = UpdateFieldCommand;
