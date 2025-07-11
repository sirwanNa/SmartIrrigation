import { Router } from 'express';
import { SensorLogController } from '../controllers/sensorLogController';
import {ISensorLogRepository} from '../../core/Application/interface/repositories/iSensorLogRepository'
import {SensorLogRepository} from '../../infrastructure/repositories/sensorLogRepository'

const router = Router();

const sensorLogRepository: ISensorLogRepository = new SensorLogRepository();
const controller = new SensorLogController(sensorLogRepository);

router.get('/SensorLog/:id', controller.getSensorLogAsync);
router.get('/SensorLog/getSensorLogsList/',controller.getSensorLogsListAsync);
router.post('/SensorLog/create/',controller.createSensorLogAsync);

export default router;
