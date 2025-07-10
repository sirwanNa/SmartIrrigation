"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateFarmCommand = void 0;
class UpdateFarmCommand {
    constructor(farmRepository) {
        this._farmRepository = farmRepository;
    }
    async executeAsync() {
        if (!this.farmData) {
            throw new Error('Farm data is undefined');
        }
        return await this._farmRepository.updateAsync(this.farmData);
    }
}
exports.UpdateFarmCommand = UpdateFarmCommand;
