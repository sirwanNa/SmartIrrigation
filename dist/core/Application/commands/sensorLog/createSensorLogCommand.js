"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateSensorLogCommand = void 0;
const sensorType_1 = require("../../../domain/enums/sensorType");
class CreateSensorLogCommand {
    constructor(uow, sensorLogRepository, sensorRepository, irrigationLogRepository, fieldRepository, dataSetRepository) {
        this.uow = uow;
        this.sensorLogRepository = sensorLogRepository;
        this.sensorRepository = sensorRepository;
        this.irrigationLogRepository = irrigationLogRepository;
        this.fieldRepository = fieldRepository;
        this.dataSetRepository = dataSetRepository;
    }
    async executeAsync() {
        if (!this.sensorLogData) {
            throw new Error('SensorLog data is undefined');
        }
        let field = await this.getField(this.sensorLogData.sensorId);
        let weatherLog = await this.getWeather(field.id);
        let lastIrrigationLog = (await this.irrigationLogRepository.getIrrigationLogsListAsync(field.id))
            .orderByDesc(p => p.createdDate).firstItem();
        if (lastIrrigationLog === undefined)
            throw new Error("IrrigationLog Not Found");
        await this.uow.start();
        let sensorLogCreated = await this.sensorLogRepository.createAsync(this.sensorLogData);
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
        let dataSetCreated = await this.dataSetRepository.createAsync(dataSet);
        await this.uow.complete();
        return sensorLogCreated && dataSetCreated;
    }
    async getField(sensorId) {
        const sensor = await this.sensorRepository.getSensorAsync(sensorId);
        if (sensor === undefined)
            throw new Error("Sensor Not Found");
        const field = await this.fieldRepository.getFieldAsync(sensor.fieldId);
        if (field === undefined)
            throw new Error("Field Not Found");
        return field;
    }
    async getWeather(fieldId) {
        let sensor = (await this.sensorRepository.getSensorsListAsync(fieldId))
            .filter(p => p.sensorType === sensorType_1.SensorType.AirTemperature)
            .orderByDesc(p => p.createdDate)
            .firstItem();
        if (sensor === undefined)
            throw new Error('Weather sensor in this field did not find');
        let weatherLog = (await this.sensorLogRepository.getSensorLogsListAsync(sensor.id)).firstItem();
        if (weatherLog === undefined)
            throw new Error('Weather log did not found');
        return weatherLog;
    }
}
exports.CreateSensorLogCommand = CreateSensorLogCommand;
