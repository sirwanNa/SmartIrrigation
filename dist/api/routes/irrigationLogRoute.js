"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const irrigationLogController_1 = require("../controllers/irrigationLogController");
const irrigationLogRepository_1 = require("../../infrastructure/repositories/irrigationLogRepository");
const mongoContext_1 = require("../../infrastructure/data/mongoContext");
const unitofWork_1 = require("../../infrastructure/data/unitofWork");
const uri = 'mongodb://localhost:27017';
const dbName = 'smartIrrigation';
const router = (0, express_1.Router)();
var mongoContext = new mongoContext_1.MongoContext(uri, dbName);
var uow = new unitofWork_1.UnitOfWork(mongoContext);
const irrigationLogRepository = new irrigationLogRepository_1.IrrigationLogRepository(uow);
const controller = new irrigationLogController_1.IrrigationLogController(irrigationLogRepository);
router.get('/IrrigationLog/:id', controller.getIrrigationLogAsync);
router.get('/IrrigationLog/getIrrigationLogsList/', controller.getIrrigationLogsListAsync);
router.post('/IrrigationLog/create/', controller.createIrrigationLogAsync);
exports.default = router;
