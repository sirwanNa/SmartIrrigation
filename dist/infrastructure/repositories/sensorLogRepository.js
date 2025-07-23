"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SensorLogRepository = void 0;
const list_1 = require("../../share/utilities/list");
const baseRepository_1 = require("./baseRepository");
const mapper_1 = require("../../share/utilities/mapper");
const irrigationLogRepository_1 = require("./irrigationLogRepository");
const fieldRepository_1 = require("./fieldRepository");
const sensorType_1 = require("../../core/domain/enums/sensorType");
const dataSetRepository_1 = require("./dataSetRepository");
const sensorRepository_1 = require("./sensorRepository");
class SensorLogRepository extends baseRepository_1.BaseRepository {
    constructor(uow) {
        super(uow, 'sensorLogs');
    }
    async getSensorLogAsync(id) {
        const entity = await this.getById(id);
        if (!entity)
            throw new Error(`SensorLog with ID ${id} not found`);
        return mapper_1.Mapper.Map(entity);
    }
    async getSensorLogsListAsync(sensorId) {
        var filter = { sensorId };
        const entities = await this.getAll(filter);
        const list = new list_1.List(entities);
        return list;
    }
    async createAsync(sensorLog) {
        const existing = await this.getById(sensorLog.id);
        if (existing)
            return false;
        let field = await this.getField(sensorLog.sensorId);
        let weatherLog = await this.getWeather(field.id);
        let irrigationLogRepository = new irrigationLogRepository_1.IrrigationLogRepository(this.uow);
        let lastIrrigationLog = (await irrigationLogRepository.getIrrigationLogsListAsync(field.id)).orderByDesc(p => p.createdDate).firstItem();
        if (lastIrrigationLog === undefined)
            throw new Error("IrrigationLog Not Found");
        await this.uow.start();
        const entity = mapper_1.Mapper.Map(sensorLog);
        let sensorLogCreated = await this.create(entity);
        let dataSet = {
            id: 1,
            createdDate: new Date(),
            soilType: field.soilType,
            cropType: field.cropType,
            landSlope: field.landSlope,
            month: new Date().getMonth(),
            temperature: weatherLog.value,
            estimated_Time: ((new Date()).getUTCSeconds() - lastIrrigationLog.createdDate.getUTCSeconds()),
        };
        let dataSetRepository = new dataSetRepository_1.DataSetRepository(this.uow);
        let dataSetCreated = await dataSetRepository.createAsync(dataSet);
        this.uow.complete();
        return sensorLogCreated && dataSetCreated;
    }
    async getField(sensorId) {
        const sensorRepository = new sensorRepository_1.SensorRepository(this.uow);
        const sensor = await sensorRepository.getSensorAsync(sensorId);
        if (sensor === undefined)
            throw new Error("Sensor Not Found");
        const fieldRepository = new fieldRepository_1.FieldRepository(this.uow);
        const field = await fieldRepository.getFieldAsync(sensor.fieldId);
        if (field === undefined)
            throw new Error("Field Not Found");
        return field;
    }
    async getWeather(fieldId) {
        let sensorRepository = new sensorRepository_1.SensorRepository(this.uow);
        let sensor = (await sensorRepository.getSensorsListAsync(fieldId))
            .filter(p => p.sensorType === sensorType_1.SensorType.AirTemperature)
            .orderByDesc(p => p.createdDate)
            .firstItem();
        if (sensor === undefined)
            throw new Error('Weather sensor in this field did not find');
        let weatherLog = (await this.getSensorLogsListAsync(sensor.id)).firstItem();
        if (weatherLog === undefined)
            throw new Error('Weather log did not found');
        return weatherLog;
    }
}
exports.SensorLogRepository = SensorLogRepository;
