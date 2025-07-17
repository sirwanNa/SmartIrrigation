// const express = require('express');
// import {FarmController} from '../controllers/farmController'
// import {IFarmRepository} from '../../core/Application/interface/repositories/iFarmRepository'

// const router = express.Router();
// var controller:FarmController = new FarmController()
// router.route('/orders/me').get(true, controller.getFarm);

// module.exports = router;

import { Router } from 'express';
import { FarmController } from '../controllers/farmController';
import {IFarmRepository} from '../../core/application/interface/repositories/iFarmRepository'
import {FarmRepository} from '../../infrastructure/repositories/farmRepository'
import { MongoContext } from '../../infrastructure/data/mongoContext';
import { UnitOfWork } from '../../infrastructure/data/unitofWork';
const uri = 'mongodb://localhost:27017';
const dbName = 'smartIrrigation';

const router = Router();
var mongoContext:MongoContext = new MongoContext(uri,dbName);
var uow:UnitOfWork = new UnitOfWork(mongoContext);
const farmRepository: IFarmRepository = new FarmRepository(uow);
const controller = new FarmController(farmRepository);

router.get('/farm/getfarm/:id', controller.getFarmAsync);
router.get('/farm/getfarmsList/',controller.getFarmsListAsync);
router.post('/farm/create/',controller.createFarmAsync);
router.put('/farm/update/',controller.updateFarmAsync);
router.delete('/farm/delete/',controller.deleteFarmAsync);

export default router;

