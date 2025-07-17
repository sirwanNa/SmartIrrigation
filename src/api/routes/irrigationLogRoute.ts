import { Router } from 'express';
import { IrrigationLogController } from '../controllers/irrigationLogController';
import {IIrrigationLogRepository} from '../../core/application/interface/repositories/iIrrigationLogRepository'
import {IrrigationLogRepository} from '../../infrastructure/repositories/irrigationLogRepository'
import { MongoContext } from '../../infrastructure/data/mongoContext';
import { UnitOfWork } from '../../infrastructure/data/unitofWork';
const uri = 'mongodb://localhost:27017';
const dbName = 'smartIrrigation';

const router = Router();
var mongoContext:MongoContext = new MongoContext(uri,dbName);
var uow:UnitOfWork = new UnitOfWork(mongoContext);
const irrigationLogRepository: IIrrigationLogRepository = new IrrigationLogRepository(uow);
const controller = new IrrigationLogController(irrigationLogRepository);

router.get('/IrrigationLog/:id', controller.getIrrigationLogAsync);
router.get('/IrrigationLog/getIrrigationLogsList/',controller.getIrrigationLogsListAsync);
router.post('/IrrigationLog/create/',controller.createIrrigationLogAsync);

export default router;
