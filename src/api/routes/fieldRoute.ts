import { Router } from 'express';
import { FieldController } from '../controllers/fieldController';
import {IFieldRepository} from '../../core/application/interface/repositories/iFieldRepository'
import {FieldRepository} from '../../infrastructure/repositories/fieldRepository'
import { MongoContext } from '../../infrastructure/data/mongoContext';
import { UnitOfWork } from '../../infrastructure/data/unitofWork';
const uri = 'mongodb://localhost:27017';
const dbName = 'smartIrrigation';

const router = Router();
var mongoContext:MongoContext = new MongoContext(uri,dbName);
var uow:UnitOfWork = new UnitOfWork(mongoContext);
const fieldRepository: IFieldRepository = new FieldRepository(uow);
const controller = new FieldController(fieldRepository);

router.get('/Field/:id', controller.getFieldAsync);
router.get('/Field/getFieldsList/',controller.getFieldsListAsync);
router.post('/Field/create/',controller.createFieldAsync);
router.put('/Field/update/',controller.updateFieldAsync);
router.delete('/Field/delete/',controller.deleteFieldAsync);

export default router;

