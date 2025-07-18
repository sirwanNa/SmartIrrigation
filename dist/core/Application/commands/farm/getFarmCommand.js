"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetFarmCommand = void 0;
class GetFarmCommand {
    constructor(farmRepository) {
        this._farmRepository = farmRepository;
    }
    executeAsync() {
        if (this.FarmId === undefined)
            throw new Error('Id is undefined');
        return this._farmRepository.getFarmAsync(this.FarmId);
    }
}
exports.GetFarmCommand = GetFarmCommand;
