"use strict";
// const express = require('express');
// import {FarmController} from '../controllers/farmController'
// import {IFarmRepository} from '../../core/Application/interface/repositories/iFarmRepository'
Object.defineProperty(exports, "__esModule", { value: true });
// const router = express.Router();
// var controller:FarmController = new FarmController()
// router.route('/orders/me').get(true, controller.getFarm);
// module.exports = router;
const express_1 = require("express");
const farmController_1 = require("../controllers/farmController");
const farmRepository_1 = require("../../infrastructure/repositories/farmRepository");
const router = (0, express_1.Router)();
const farmRepository = new farmRepository_1.FarmRepository();
const controller = new farmController_1.FarmController(farmRepository);
router.get('/farm/:id', controller.getFarmAsync);
router.get('/farm/getfarmsList/', controller.getFarmsListAsync);
router.post('/farm/create/', controller.createFarmAsync);
router.put('/farm/update/', controller.updateFarmAsync);
router.delete('/farm/delete/', controller.deleteFarmAsync);
exports.default = router;
