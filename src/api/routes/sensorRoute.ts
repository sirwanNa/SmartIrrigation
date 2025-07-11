import { Router } from 'express';
import { SensorController } from '../controllers/sensorController';
import {ISensorRepository} from '../../core/application/interface/repositories/iSensorRepository'
import {SensorRepository} from '../../infrastructure/repositories/sensorRepository'

const router = Router();

const sensorRepository: ISensorRepository = new SensorRepository();
const controller = new SensorController(sensorRepository);

router.get('/Sensor/:id', controller.getSensorAsync);
router.get('/Sensor/getSensorsList/',controller.getSensorsListAsync);
router.post('/Sensor/create/',controller.createSensorAsync);
router.put('/Sensor/update/',controller.updateSensorAsync);
router.delete('/Sensor/delete/',controller.deleteSensorAsync);

export default router;

