// const express = require('express');
// import {FarmController} from '../controllers/farmController'
// import {IFarmRepository} from '../../core/Application/interface/repositories/iFarmRepository'

// const router = express.Router();
// var controller:FarmController = new FarmController()
// router.route('/orders/me').get(true, controller.getFarm);

// module.exports = router;

import { Router } from 'express';
import { FarmController } from '../controllers/farmController';
import {IFarmRepository} from '../../core/Application/interface/repositories/iFarmRepository'
import {FarmRepository} from '../../infrastructure/repositories/farmRepository'

const router = Router();

const farmRepository: IFarmRepository = new FarmRepository();
const controller = new FarmController(farmRepository);

router.get('/farm/:id', controller.getFarm);

export default router;

