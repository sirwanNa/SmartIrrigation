"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateFarmCommand = void 0;
class CreateFarmCommand {
    constructor(farmRepository) {
        this._farmRepository = farmRepository;
    }
    async executeAsync() {
        if (!this.farmData) {
            throw new Error('Farm data is undefined');
        }
        return await this._farmRepository.createAsync(this.farmData);
    }
}
exports.CreateFarmCommand = CreateFarmCommand;
