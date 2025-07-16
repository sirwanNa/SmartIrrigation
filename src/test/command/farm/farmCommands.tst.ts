import {CreateFarmCommand} from '../../../core/application/commands/farm/createFarmCommand'
import {GetFarmsListCommand} from '../../../core/application/commands/farm/getFarmsListCommand'
import {IFarmRepository} from '../../../core/application/interface/repositories/iFarmRepository'
import {FarmRepository} from '../../../infrastructure/repositories/farmRepository'
import {FarmType} from '../../../core/domain/enums/farmType'
import {IrrigationType} from '../../../core/domain/enums/irrigationType'
import { UnitOfWork } from '../../../infrastructure/data/unitofWork'
import { MongoContext } from '../../../infrastructure/data/mongoContext'

async function testFarmCommands(){
    var mongoContext:MongoContext = new MongoContext("localhost:70125","smartIrrigation");
    var uow:UnitOfWork = new UnitOfWork(mongoContext);
    var farmRepository:IFarmRepository = new FarmRepository(uow);
    var createFarmCommand = new CreateFarmCommand(farmRepository);
    createFarmCommand.farmData =  {
        createdDate :new Date('1/1/2025'),
        farmType :FarmType.FieldCrop,
        irrigationType : IrrigationType.Drip,
        name:'Farm1',
        id:1
    };

    const result: boolean = await createFarmCommand.executeAsync();
    console.log("Create Farm Result :",result);

    var getFarmsListCommand:GetFarmsListCommand = new GetFarmsListCommand(farmRepository);
    var farmsList = await getFarmsListCommand.executeAsync();
    console.log('farms List:',farmsList);
} 

testFarmCommands();
