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
const mongoContext_1 = require("../../infrastructure/data/mongoContext");
const unitofWork_1 = require("../../infrastructure/data/unitofWork");
const uri = 'mongodb://localhost:27017';
const dbName = 'smartIrrigation';
const router = (0, express_1.Router)();
var mongoContext = new mongoContext_1.MongoContext(uri, dbName);
var uow = new unitofWork_1.UnitOfWork(mongoContext);
const farmRepository = new farmRepository_1.FarmRepository(uow);
const controller = new farmController_1.FarmController(farmRepository);
router.get('/farm/getfarm/:id', controller.getFarmAsync);
router.get('/farm/getfarmsList/', controller.getFarmsListAsync);
router.post('/farm/create/', controller.createFarmAsync);
router.put('/farm/update/', controller.updateFarmAsync);
router.delete('/farm/delete/', controller.deleteFarmAsync);
exports.default = router;
