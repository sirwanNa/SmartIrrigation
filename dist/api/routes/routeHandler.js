"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RouteHandlers = void 0;
const express_1 = require("express");
const farmController_1 = require("../controllers/farmController");
const farmRepository_1 = require("../../infrastructure/repositories/farmRepository");
const mongoContext_1 = require("../../infrastructure/data/mongoContext");
const unitofWork_1 = require("../../infrastructure/data/unitofWork");
const fieldRepository_1 = require("../../infrastructure/repositories/fieldRepository");
const fieldController_1 = require("../controllers/fieldController");
const irrigationLogRepository_1 = require("../../infrastructure/repositories/irrigationLogRepository");
const irrigationLogController_1 = require("../controllers/irrigationLogController");
const plantGrowthController_1 = require("../controllers/plantGrowthController");
const plantGrowthRepository_1 = require("../../infrastructure/repositories/plantGrowthRepository");
const sensorLogController_1 = require("../controllers/sensorLogController");
const sensorLogRepository_1 = require("../../infrastructure/repositories/sensorLogRepository");
const sensorRepository_1 = require("../../infrastructure/repositories/sensorRepository");
const sensorController_1 = require("../controllers/sensorController");
class RouteHandlers {
    constructor() {
        this.router = (0, express_1.Router)();
        this.getRoutes = () => {
            this.farmAPIs();
            this.fieldAPIs();
            this.irrigationLogAPIs();
            this.plantGrowthAPIs();
            this.sensorLogAPIs();
            this.sensorAPIs();
            return this.router;
        };
        this.farmAPIs = () => {
            const farmRepository = new farmRepository_1.FarmRepository(this.uow);
            const controller = new farmController_1.FarmController(farmRepository);
            this.router.get('/farm/getfarm/:id', controller.getFarmAsync);
            this.router.get('/farm/getfarmsList/', controller.getFarmsListAsync);
            this.router.post('/farm/create/', controller.createFarmAsync);
            this.router.put('/farm/update/', controller.updateFarmAsync);
            this.router.delete('/farm/delete/:id', controller.deleteFarmAsync);
        };
        this.fieldAPIs = () => {
            const fieldRepository = new fieldRepository_1.FieldRepository(this.uow);
            const controller = new fieldController_1.FieldController(fieldRepository);
            this.router.get('/field/:id', controller.getFieldAsync);
            this.router.get('/field/getFieldsList/', controller.getFieldsListAsync);
            this.router.post('/field/create/', controller.createFieldAsync);
            this.router.put('/field/update/', controller.updateFieldAsync);
            this.router.delete('/field/delete/', controller.deleteFieldAsync);
        };
        this.irrigationLogAPIs = () => {
            const irrigationLogRepository = new irrigationLogRepository_1.IrrigationLogRepository(this.uow);
            const controller = new irrigationLogController_1.IrrigationLogController(irrigationLogRepository);
            this.router.get('/irrigationLog/:id', controller.getIrrigationLogAsync);
            this.router.get('/irrigationLog/getIrrigationLogsList/', controller.getIrrigationLogsListAsync);
            this.router.post('/irrigationLog/create/', controller.createIrrigationLogAsync);
        };
        this.plantGrowthAPIs = () => {
            const plantGrowthRepository = new plantGrowthRepository_1.PlantGrowthRepository(this.uow);
            const controller = new plantGrowthController_1.PlantGrowthController(plantGrowthRepository);
            this.router.get('/plantGrowth/:id', controller.getPlantGrowthAsync);
            this.router.get('/plantGrowth/getPlantGrowthsList/', controller.getPlantGrowthsListAsync);
            this.router.post('/plantGrowth/create/', controller.createPlantGrowthAsync);
            this.router.put('/plantGrowth/update/', controller.updatePlantGrowthAsync);
            this.router.delete('/plantGrowth/delete/', controller.deletePlantGrowthAsync);
        };
        this.sensorLogAPIs = () => {
            const sensorLogRepository = new sensorLogRepository_1.SensorLogRepository(this.uow);
            const controller = new sensorLogController_1.SensorLogController(sensorLogRepository);
            this.router.get('/sensorLog/:id', controller.getSensorLogAsync);
            this.router.get('/sensorLog/getSensorLogsList/', controller.getSensorLogsListAsync);
            this.router.post('/sensorLog/create/', controller.createSensorLogAsync);
        };
        this.sensorAPIs = () => {
            const sensorRepository = new sensorRepository_1.SensorRepository(this.uow);
            const controller = new sensorController_1.SensorController(sensorRepository);
            this.router.get('/sensor/:id', controller.getSensorAsync);
            this.router.get('/sensor/getSensorsList/', controller.getSensorsListAsync);
            this.router.post('/sensor/create/', controller.createSensorAsync);
            this.router.put('/sensor/update/', controller.updateSensorAsync);
            this.router.delete('/sensor/delete/', controller.deleteSensorAsync);
        };
        this.mongoContext = new mongoContext_1.MongoContext();
        this.uow = new unitofWork_1.UnitOfWork(this.mongoContext);
    }
}
exports.RouteHandlers = RouteHandlers;
