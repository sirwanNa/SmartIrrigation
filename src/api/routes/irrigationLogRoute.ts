import { Router } from 'express';
import { IrrigationLogController } from '../controllers/irrigationLogController';
import {IIrrigationLogRepository} from '../../core/application/interface/repositories/iIrrigationLogRepository'
import {IrrigationLogRepository} from '../../infrastructure/repositories/irrigationLogRepository'

const router = Router();

const irrigationLogRepository: IIrrigationLogRepository = new IrrigationLogRepository();
const controller = new IrrigationLogController(irrigationLogRepository);

router.get('/IrrigationLog/:id', controller.getIrrigationLogAsync);
router.get('/IrrigationLog/getIrrigationLogsList/',controller.getIrrigationLogsListAsync);
router.post('/IrrigationLog/create/',controller.createIrrigationLogAsync);

export default router;
