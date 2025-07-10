"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetFarmsListCommand = void 0;
class GetFarmsListCommand {
    constructor(farmRepository) {
        this._farmRepository = farmRepository;
    }
    executeAsync() {
        return this._farmRepository.getFarmsListAsync();
    }
}
exports.GetFarmsListCommand = GetFarmsListCommand;
