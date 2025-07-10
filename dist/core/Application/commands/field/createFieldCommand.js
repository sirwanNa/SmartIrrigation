"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateFieldCommand = void 0;
class CreateFieldCommand {
    constructor(fieldRepository) {
        this._fieldRepository = fieldRepository;
    }
    async executeAsync() {
        if (!this.fieldData) {
            throw new Error('Field data is undefined');
        }
        return await this._fieldRepository.createAsync(this.fieldData);
    }
}
exports.CreateFieldCommand = CreateFieldCommand;
