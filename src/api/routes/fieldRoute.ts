import { Router } from 'express';
import { FieldController } from '../controllers/fieldController';
import {IFieldRepository} from '../../core/application/interface/repositories/iFieldRepository'
import {FieldRepository} from '../../infrastructure/repositories/fieldRepository'

const router = Router();

const fieldRepository: IFieldRepository = new FieldRepository();
const controller = new FieldController(fieldRepository);

router.get('/Field/:id', controller.getFieldAsync);
router.get('/Field/getFieldsList/',controller.getFieldsListAsync);
router.post('/Field/create/',controller.createFieldAsync);
router.put('/Field/update/',controller.updateFieldAsync);
router.delete('/Field/delete/',controller.deleteFieldAsync);

export default router;

