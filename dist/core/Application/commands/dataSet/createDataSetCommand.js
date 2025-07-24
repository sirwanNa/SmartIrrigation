"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateDataSetCommand = void 0;
class CreateDataSetCommand {
    constructor(uow, dataSetRepository) {
        this.uow = uow;
        this.dataSetRepository = dataSetRepository;
    }
    async executeAsync() {
        if (!this.dataSetData) {
            throw new Error('DataSet data is undefined');
        }
        this.uow.start();
        let result = await this.dataSetRepository.createAsync(this.dataSetData);
        this.uow.complete();
        return result;
    }
}
exports.CreateDataSetCommand = CreateDataSetCommand;
