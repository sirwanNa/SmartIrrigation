import { Router } from 'express';
import { PlantGrowthController } from '../controllers/plantGrowthController';
import {IPlantGrowthRepository} from '../../core/application/interface/repositories/iPlantGrowthRepository'
import {PlantGrowthRepository} from '../../infrastructure/repositories/plantGrowthRepository'

const router = Router();

const plantGrowthRepository: IPlantGrowthRepository = new PlantGrowthRepository();
const controller = new PlantGrowthController(plantGrowthRepository);

router.get('/plantGrowth/:id', controller.getPlantGrowthAsync);
router.get('/plantGrowth/getPlantGrowthsList/',controller.getPlantGrowthsListAsync);
router.post('/plantGrowth/create/',controller.createPlantGrowthAsync);
router.put('/plantGrowth/update/',controller.updatePlantGrowthAsync);
router.delete('/plantGrowth/delete/',controller.deletePlantGrowthAsync);

export default router;
