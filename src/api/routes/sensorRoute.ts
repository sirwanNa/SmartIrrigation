import { Router } from 'express';
import { SensorController } from '../controllers/sensorController';
import {ISensorRepository} from '../../core/application/interface/repositories/iSensorRepository'
import {SensorRepository} from '../../infrastructure/repositories/sensorRepository'
import { MongoContext } from '../../infrastructure/data/mongoContext';
import { UnitOfWork } from '../../infrastructure/data/unitofWork';
const uri = 'mongodb://localhost:27017';
const dbName = 'smartIrrigation';
const router = Router();
var mongoContext:MongoContext = new MongoContext(uri,dbName);
var uow:UnitOfWork = new UnitOfWork(mongoContext);
const sensorRepository: ISensorRepository = new SensorRepository(uow);
const controller = new SensorController(sensorRepository);

router.get('/sensor/:id', controller.getSensorAsync);
router.get('/sensor/getSensorsList/',controller.getSensorsListAsync);
router.post('/sensor/create/',controller.createSensorAsync);
router.put('/sensor/update/',controller.updateSensorAsync);
router.delete('/sensor/delete/',controller.deleteSensorAsync);

export default router;

