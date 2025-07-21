"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetDataSetCommand = void 0;
class GetDataSetCommand {
    constructor(farmRepository) {
        this._dataSetRepository = farmRepository;
    }
    executeAsync() {
        return this._dataSetRepository.getDataSetAsync();
    }
}
exports.GetDataSetCommand = GetDataSetCommand;
