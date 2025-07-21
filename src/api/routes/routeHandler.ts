import { Router } from 'express';
import { FarmController } from '../controllers/farmController';
import {IFarmRepository} from '../../core/application/interface/repositories/iFarmRepository'
import {FarmRepository} from '../../infrastructure/repositories/farmRepository'
import { MongoContext } from '../../infrastructure/data/mongoContext';
import { UnitOfWork } from '../../infrastructure/data/unitofWork';
import { IFieldRepository } from '../../core/application/interface/repositories/iFieldRepository';
import { FieldRepository } from '../../infrastructure/repositories/fieldRepository';
import { FieldController } from '../controllers/fieldController';
import { IIrrigationLogRepository } from '../../core/application/interface/repositories/iIrrigationLogRepository';
import { IrrigationLogRepository } from '../../infrastructure/repositories/irrigationLogRepository';
import { IrrigationLogController } from '../controllers/irrigationLogController';
import { PlantGrowthController } from '../controllers/plantGrowthController';
import { PlantGrowthRepository } from '../../infrastructure/repositories/plantGrowthRepository';
import { IPlantGrowthRepository } from '../../core/application/interface/repositories/iPlantGrowthRepository';
import { SensorLogController } from '../controllers/sensorLogController';
import { SensorLogRepository } from '../../infrastructure/repositories/sensorLogRepository';
import { ISensorLogRepository } from '../../core/application/interface/repositories/iSensorLogRepository';
import { ISensorRepository } from '../../core/application/interface/repositories/iSensorRepository';
import { SensorRepository } from '../../infrastructure/repositories/sensorRepository';
import { SensorController } from '../controllers/sensorController';
import { IDataSetRepository } from '../../core/application/interface/repositories/iDataSetRepository';
import { DataSetRepository } from '../../infrastructure/repositories/dataSetRepository';
import { DataSetController } from '../controllers/dataSetController';

export class RouteHandlers{
    private router = Router();
    private readonly mongoContext:MongoContext;
    private readonly uow:UnitOfWork;
    constructor(){
        this.mongoContext = new MongoContext();
        this.uow = new UnitOfWork(this.mongoContext);
    }
    getRoutes=():Router=>{
        this.farmAPIs();
        this.fieldAPIs();
        this.irrigationLogAPIs();
        this.plantGrowthAPIs();
        this.sensorLogAPIs();
        this.sensorAPIs();
        return this.router;
    }
    farmAPIs=()=>{
        const farmRepository: IFarmRepository = new FarmRepository(this.uow);
        const controller = new FarmController(farmRepository);

        this.router.get('/farm/getfarm/:id', controller.getFarmAsync);
        this.router.get('/farm/getfarmsList/',controller.getFarmsListAsync);
        this.router.post('/farm/create/',controller.createFarmAsync);
        this.router.put('/farm/update/',controller.updateFarmAsync);
        this.router.delete('/farm/delete/:id',controller.deleteFarmAsync);       
    }
    fieldAPIs =()=>{
        const fieldRepository: IFieldRepository = new FieldRepository(this.uow);
        const controller = new FieldController(fieldRepository);
        
        this.router.get('/field/:id', controller.getFieldAsync);
        this.router.get('/field/getFieldsList/',controller.getFieldsListAsync);
        this.router.post('/field/create/',controller.createFieldAsync);
        this.router.put('/field/update/',controller.updateFieldAsync);
        this.router.delete('/field/delete/:id',controller.deleteFieldAsync);
    }
    irrigationLogAPIs = ()=>{
        const irrigationLogRepository: IIrrigationLogRepository = new IrrigationLogRepository(this.uow);
        const controller = new IrrigationLogController(irrigationLogRepository);
        
        this.router.get('/irrigationLog/:id', controller.getIrrigationLogAsync);
        this.router.get('/irrigationLog/getIrrigationLogsList/',controller.getIrrigationLogsListAsync);
        this.router.post('/irrigationLog/create/',controller.createIrrigationLogAsync);
    }
    plantGrowthAPIs =()=>{
        const plantGrowthRepository: IPlantGrowthRepository = new PlantGrowthRepository(this.uow);
        const controller = new PlantGrowthController(plantGrowthRepository);
        this.router.get('/plantGrowth/:id', controller.getPlantGrowthAsync);
        this.router.get('/plantGrowth/getPlantGrowthsList/',controller.getPlantGrowthsListAsync);
        this.router.post('/plantGrowth/create/',controller.createPlantGrowthAsync);
        this.router.put('/plantGrowth/update/',controller.updatePlantGrowthAsync);
        this.router.delete('/plantGrowth/delete/:id',controller.deletePlantGrowthAsync);
    }
    sensorLogAPIs = ()=>{
        const sensorLogRepository: ISensorLogRepository = new SensorLogRepository(this.uow);
        const controller = new SensorLogController(sensorLogRepository);
        
        this.router.get('/sensorLog/:id', controller.getSensorLogAsync);
        this.router.get('/sensorLog/getSensorLogsList/',controller.getSensorLogsListAsync);
        this.router.post('/sensorLog/create/',controller.createSensorLogAsync);
    }
    sensorAPIs =()=>{
       const sensorRepository: ISensorRepository = new SensorRepository(this.uow);
       const controller = new SensorController(sensorRepository);
       
       this.router.get('/sensor/:id', controller.getSensorAsync);
       this.router.get('/sensor/getSensorsList/',controller.getSensorsListAsync);
       this.router.post('/sensor/create/',controller.createSensorAsync);
       this.router.put('/sensor/update/',controller.updateSensorAsync);
       this.router.delete('/sensor/delete/:id',controller.deleteSensorAsync);

    }
    dataSetAPIs=()=>{
        const dataSetRepository: IDataSetRepository = new DataSetRepository(this.uow);
        const controller = new DataSetController(dataSetRepository);

         this.router.get('/dataSet/getDataSet', controller.getDataSetAsync);
    }
}