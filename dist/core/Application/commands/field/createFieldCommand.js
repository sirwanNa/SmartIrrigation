"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateFieldCommand = void 0;
class CreateFieldCommand {
    constructor(uow, fieldRepository) {
        this.uow = uow;
        this.fieldRepository = fieldRepository;
    }
    async executeAsync() {
        if (!this.fieldData) {
            throw new Error('Field data is undefined');
        }
        this.uow.start();
        let result = await this.fieldRepository.createAsync(this.fieldData);
        this.uow.complete();
        return result;
    }
}
exports.CreateFieldCommand = CreateFieldCommand;
