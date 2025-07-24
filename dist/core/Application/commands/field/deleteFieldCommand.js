"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteFieldCommand = void 0;
class DeleteFieldCommand {
    constructor(uow, fieldRepository) {
        this.uow = uow;
        this.fieldRepository = fieldRepository;
    }
    async executeAsync() {
        if (this.fieldId === undefined)
            throw new Error('Id is undefined');
        this.uow.start();
        let result = await this.fieldRepository.removeAsync(this.fieldId);
        this.uow.complete();
        return result;
    }
}
exports.DeleteFieldCommand = DeleteFieldCommand;
