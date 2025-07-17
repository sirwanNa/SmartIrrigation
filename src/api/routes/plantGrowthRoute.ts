import { Router } from 'express';
import { PlantGrowthController } from '../controllers/plantGrowthController';
import {IPlantGrowthRepository} from '../../core/application/interface/repositories/iPlantGrowthRepository'
import {PlantGrowthRepository} from '../../infrastructure/repositories/plantGrowthRepository'
import { MongoContext } from '../../infrastructure/data/mongoContext';
import { UnitOfWork } from '../../infrastructure/data/unitofWork';
const uri = 'mongodb://localhost:27017';
const dbName = 'smartIrrigation';
const router = Router();
var mongoContext:MongoContext = new MongoContext(uri,dbName);
var uow:UnitOfWork = new UnitOfWork(mongoContext);
const plantGrowthRepository: IPlantGrowthRepository = new PlantGrowthRepository(uow);
const controller = new PlantGrowthController(plantGrowthRepository);

router.get('/plantGrowth/:id', controller.getPlantGrowthAsync);
router.get('/plantGrowth/getPlantGrowthsList/',controller.getPlantGrowthsListAsync);
router.post('/plantGrowth/create/',controller.createPlantGrowthAsync);
router.put('/plantGrowth/update/',controller.updatePlantGrowthAsync);
router.delete('/plantGrowth/delete/',controller.deletePlantGrowthAsync);

export default router;
