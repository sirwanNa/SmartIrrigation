"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateDataSetCommand = void 0;
class CreateDataSetCommand {
    constructor(DataSetRepository) {
        this._dataSetRepository = DataSetRepository;
    }
    async executeAsync() {
        if (!this.dataSetData) {
            throw new Error('DataSet data is undefined');
        }
        return await this._dataSetRepository.createAsync(this.dataSetData);
    }
}
exports.CreateDataSetCommand = CreateDataSetCommand;
