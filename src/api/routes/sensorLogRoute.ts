import { Router } from 'express';
import { SensorLogController } from '../controllers/sensorLogController';
import {ISensorLogRepository} from '../../core/application/interface/repositories/iSensorLogRepository'
import {SensorLogRepository} from '../../infrastructure/repositories/sensorLogRepository'
import { MongoContext } from '../../infrastructure/data/mongoContext';
import { UnitOfWork } from '../../infrastructure/data/unitofWork';
const uri = 'mongodb://localhost:27017';
const dbName = 'smartIrrigation';

const router = Router();
var mongoContext:MongoContext = new MongoContext(uri,dbName);
var uow:UnitOfWork = new UnitOfWork(mongoContext);
const sensorLogRepository: ISensorLogRepository = new SensorLogRepository(uow);
const controller = new SensorLogController(sensorLogRepository);

router.get('/SensorLog/:id', controller.getSensorLogAsync);
router.get('/SensorLog/getSensorLogsList/',controller.getSensorLogsListAsync);
router.post('/SensorLog/create/',controller.createSensorLogAsync);

export default router;
