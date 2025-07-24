"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateFarmCommand = void 0;
class UpdateFarmCommand {
    constructor(uow, farmRepository) {
        this.uow = uow;
        this.farmRepository = farmRepository;
    }
    async executeAsync() {
        if (!this.farmData) {
            throw new Error('Farm data is undefined');
        }
        this.uow.start();
        let result = await this.farmRepository.updateAsync(this.farmData);
        this.uow.complete();
        return result;
    }
}
exports.UpdateFarmCommand = UpdateFarmCommand;
