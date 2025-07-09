"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FarmController = void 0;
const getFarmCommand_1 = require("../../core/Application/commands/farm/getFarmCommand");
class FarmController {
    constructor(farmRepository) {
        this.getFarm = (req, res) => {
            var command = new getFarmCommand_1.GetFarmCommand(this._farmRepository);
            let result = command.execute();
            return result;
        };
        this._farmRepository = farmRepository;
    }
}
exports.FarmController = FarmController;
