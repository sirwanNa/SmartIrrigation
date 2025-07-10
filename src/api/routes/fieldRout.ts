import { Router } from 'express';
import { FieldController } from '../controllers/fieldController';
import {IFieldRepository} from '../../core/Application/interface/repositories/iFieldRepository'
import {FieldRepository} from '../../infrastructure/repositories/fieldRepository'

const router = Router();

const FieldRepository: IFieldRepository = new FieldRepository();
const controller = new FieldController(FieldRepository);

router.get('/Field/:id', controller.getFieldAsync);
router.get('/Field/getFieldsList/',controller.getFieldsListAsync);
router.post('/Field/create/',controller.createFieldAsync);
router.put('/Field/update/',controller.updateFieldAsync);
router.delete('/Field/delete/',controller.deleteFieldAsync);

export default router;

