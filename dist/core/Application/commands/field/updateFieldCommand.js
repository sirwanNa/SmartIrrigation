"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateFieldCommand = void 0;
class UpdateFieldCommand {
    constructor(uow, fieldRepository) {
        this.uow = uow;
        this.fieldRepository = fieldRepository;
    }
    async executeAsync() {
        if (!this.fieldData) {
            throw new Error('Field data is undefined');
        }
        this.uow.start();
        let result = await this.fieldRepository.updateAsync(this.fieldData);
        this.uow.complete();
        return result;
    }
}
exports.UpdateFieldCommand = UpdateFieldCommand;
