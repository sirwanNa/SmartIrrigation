"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const createFarmCommand_1 = require("../../../core/application/commands/farm/createFarmCommand");
const getFarmsListCommand_1 = require("../../../core/application/commands/farm/getFarmsListCommand");
const farmRepository_1 = require("../../../infrastructure/repositories/farmRepository");
const farmType_1 = require("../../../core/domain/enums/farmType");
const irrigationType_1 = require("../../../core/domain/enums/irrigationType");
async function testFarmCommands() {
    var farmRepository = new farmRepository_1.FarmRepository();
    var createFarmCommand = new createFarmCommand_1.CreateFarmCommand(farmRepository);
    createFarmCommand.farmData = {
        createdDate: new Date('1/1/2025'),
        farmType: farmType_1.FarmType.FieldCrop,
        irrigationType: irrigationType_1.IrrigationType.Drip,
        name: 'Farm1',
        id: 1
    };
    const result = await createFarmCommand.executeAsync();
    console.log("Create Farm Result :", result);
    var getFarmsListCommand = new getFarmsListCommand_1.GetFarmsListCommand(farmRepository);
    var farmsList = await getFarmsListCommand.executeAsync();
    console.log('farms List:', farmsList);
}
testFarmCommands();
