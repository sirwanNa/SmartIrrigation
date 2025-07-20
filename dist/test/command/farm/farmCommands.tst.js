"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const createFarmCommand_1 = require("../../../core/application/commands/farm/createFarmCommand");
const getFarmsListCommand_1 = require("../../../core/application/commands/farm/getFarmsListCommand");
const farmRepository_1 = require("../../../infrastructure/repositories/farmRepository");
const farmType_1 = require("../../../core/domain/enums/farmType");
const irrigationType_1 = require("../../../core/domain/enums/irrigationType");
const unitofWork_1 = require("../../../infrastructure/data/unitofWork");
const mongoContext_1 = require("../../../infrastructure/data/mongoContext");
const getFarmCommand_1 = require("../../../core/application/commands/farm/getFarmCommand");
const updateFarmCommand_1 = require("../../../core/application/commands/farm/updateFarmCommand");
const deleteFarmCommand_1 = require("../../../core/application/commands/farm/deleteFarmCommand");
async function testFarmCommands() {
    const mongoContext = new mongoContext_1.MongoContext();
    const uow = new unitofWork_1.UnitOfWork(mongoContext);
    const farmRepository = new farmRepository_1.FarmRepository(uow);
    const farmId = 999; // Ensure unique for testing
    // 1. Create a Farm
    const createFarmCommand = new createFarmCommand_1.CreateFarmCommand(farmRepository);
    createFarmCommand.farmData = {
        id: farmId,
        name: 'Test Farm',
        farmType: farmType_1.FarmType.Greenhouse,
        irrigationType: irrigationType_1.IrrigationType.Drip,
        createdDate: new Date(),
    };
    const created = await createFarmCommand.executeAsync();
    console.log('Create Farm Result:', created);
    // 2. Get all Farms
    const getFarmsListCommand = new getFarmsListCommand_1.GetFarmsListCommand(farmRepository);
    const farmsList = await getFarmsListCommand.executeAsync();
    console.log('Farms List:', farmsList);
    // 3. Get single Farm by ID
    const getFarmCommand = new getFarmCommand_1.GetFarmCommand(farmRepository);
    getFarmCommand.FarmId = farmId;
    const singleFarm = await getFarmCommand.executeAsync();
    console.log('Get Farm by ID:', singleFarm);
    // 4. Update Farm
    const updateFarmCommand = new updateFarmCommand_1.UpdateFarmCommand(farmRepository);
    updateFarmCommand.farmData = {
        ...singleFarm,
        name: 'Updated Test Farm',
    };
    const updated = await updateFarmCommand.executeAsync();
    console.log('Update Farm Result:', updated);
    // 5. Delete Farm
    const deleteFarmCommand = new deleteFarmCommand_1.DeleteFarmCommand(farmRepository);
    deleteFarmCommand.FarmId = farmId;
    const deleted = await deleteFarmCommand.executeAsync();
    console.log('Delete Farm Result:', deleted);
}
testFarmCommands();
