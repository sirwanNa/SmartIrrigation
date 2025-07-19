import {CreateFarmCommand} from '../../../core/application/commands/farm/createFarmCommand'
import {GetFarmsListCommand} from '../../../core/application/commands/farm/getFarmsListCommand'
import {IFarmRepository} from '../../../core/application/interface/repositories/iFarmRepository'
import {FarmRepository} from '../../../infrastructure/repositories/farmRepository'
import {FarmType} from '../../../core/domain/enums/farmType'
import {IrrigationType} from '../../../core/domain/enums/irrigationType'
import { UnitOfWork } from '../../../infrastructure/data/unitofWork'
import { MongoContext } from '../../../infrastructure/data/mongoContext'
import { GetFarmCommand } from '../../../core/application/commands/farm/getFarmCommand'
import { FarmDTO } from '../../../core/application/dTOs/farmDTO'
import { UpdateFarmCommand } from '../../../core/application/commands/farm/updateFarmCommand'
import { DeleteFarmCommand } from '../../../core/application/commands/farm/deleteFarmCommand'


async function testFarmCommands() { 

  const mongoContext = new MongoContext();
  const uow = new UnitOfWork(mongoContext);
  const farmRepository: IFarmRepository = new FarmRepository(uow);

  const farmId = 999; // Ensure unique for testing

  // 1. Create a Farm
  const createFarmCommand = new CreateFarmCommand(farmRepository);
  createFarmCommand.farmData = {
    id: farmId,
    name: 'Test Farm',
    farmType: FarmType.Greenhouse,
    irrigationType: IrrigationType.Drip,
    createdDate: new Date(),
  };

  const created: boolean = await createFarmCommand.executeAsync();
  console.log('Create Farm Result:', created);

  // 2. Get all Farms
  const getFarmsListCommand = new GetFarmsListCommand(farmRepository);
  const farmsList = await getFarmsListCommand.executeAsync();
  console.log('Farms List:', farmsList);

  // 3. Get single Farm by ID
  const getFarmCommand = new GetFarmCommand(farmRepository);
  getFarmCommand.FarmId = farmId;
  const singleFarm: FarmDTO = await getFarmCommand.executeAsync();
  console.log('Get Farm by ID:', singleFarm);

  // 4. Update Farm
  const updateFarmCommand = new UpdateFarmCommand(farmRepository);
  updateFarmCommand.farmData = {
    ...singleFarm,
    name: 'Updated Test Farm',
  };
  const updated: boolean = await updateFarmCommand.executeAsync();
  console.log('Update Farm Result:', updated);

  // 5. Delete Farm
  const deleteFarmCommand = new DeleteFarmCommand(farmRepository);
  deleteFarmCommand.FarmId = farmId;
  const deleted: boolean = await deleteFarmCommand.executeAsync();
  console.log('Delete Farm Result:', deleted);
  
}

testFarmCommands();
