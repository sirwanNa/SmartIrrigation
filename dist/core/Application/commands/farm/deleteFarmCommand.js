"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteFarmCommand = void 0;
class DeleteFarmCommand {
    constructor(farmRepository) {
        this._farmRepository = farmRepository;
    }
    executeAsync() {
        if (this.FarmId === undefined)
            throw new Error('Id is undefined');
        return this._farmRepository.removeAsync(this.FarmId);
    }
}
exports.DeleteFarmCommand = DeleteFarmCommand;
