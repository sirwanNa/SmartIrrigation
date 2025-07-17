import {CreateFarmCommand} from '../../../core/application/commands/farm/createFarmCommand'
import {GetFarmsListCommand} from '../../../core/application/commands/farm/getFarmsListCommand'
import {IFarmRepository} from '../../../core/application/interface/repositories/iFarmRepository'
import {FarmRepository} from '../../../infrastructure/repositories/farmRepository'
import {FarmType} from '../../../core/domain/enums/farmType'
import {IrrigationType} from '../../../core/domain/enums/irrigationType'
import { UnitOfWork } from '../../../infrastructure/data/unitofWork'
import { MongoContext } from '../../../infrastructure/data/mongoContext'

async function testFarmCommands(){
    const uri = 'mongodb://localhost:27017';
    const dbName = 'smartIrrigation';
    var mongoContext:MongoContext = new MongoContext(uri,dbName);
    var uow:UnitOfWork = new UnitOfWork(mongoContext);
    var farmRepository:IFarmRepository = new FarmRepository(uow);
    var createFarmCommand = new CreateFarmCommand(farmRepository);
    createFarmCommand.farmData =  {
        createdDate :new Date('2/1/2025'),
        farmType :FarmType.FieldCrop,
        irrigationType : IrrigationType.Drip,
        name:'Farm2',
        id:2
    };

    const result: boolean = await createFarmCommand.executeAsync();
    console.log("Create Farm Result :",result);

    var getFarmsListCommand:GetFarmsListCommand = new GetFarmsListCommand(farmRepository);
    var farmsList = await getFarmsListCommand.executeAsync();
    console.log('farms List:',farmsList);
} 

testFarmCommands();
