"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SensorLogRepository = void 0;
const list_1 = require("../../share/utilities/list");
const baseRepository_1 = require("./baseRepository");
const mapper_1 = require("../../share/utilities/mapper");
class SensorLogRepository extends baseRepository_1.BaseRepository {
    constructor(context) {
        super(context, 'sensorLogs');
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
        // let field:FieldDTO = await this.getField(sensorLog.sensorId);  
        // let weatherLog:SensorLogDTO = await this.getWeather(field.id);    
        // let irrigationLogRepository:IIrrigationLogRepository = new IrrigationLogRepository(this.uow);
        // let lastIrrigationLog:IrrigationLog | undefined = (await irrigationLogRepository.getIrrigationLogsListAsync(field.id)).orderByDesc(p=>p.createdDate).firstItem(); 
        // if(lastIrrigationLog === undefined) throw new Error("IrrigationLog Not Found");  
        //await this.uow.start()
        const entity = mapper_1.Mapper.Map(sensorLog);
        let sensorLogCreated = await this.create(entity);
        // let dataSet:DataSetDTO = {
        //   id:1,
        //   createdDate : new Date(),
        //   soilType:field.soilType,
        //   cropType:field.cropType,
        //   landSlope:field.landSlope,
        //   month:new Date().getMonth(),
        //   temperature:weatherLog.value,
        //   estimated_Time: ((new Date()).getUTCSeconds() - lastIrrigationLog.createdDate.getUTCSeconds()) ,
        // };
        // let dataSetRepository:IDataSetRepository = new DataSetRepository(this.uow);    
        // let dataSetCreated:boolean = await dataSetRepository.createAsync(dataSet)
        //this.uow.complete();
        // return sensorLogCreated && dataSetCreated;     
        return sensorLogCreated;
    }
}
exports.SensorLogRepository = SensorLogRepository;
