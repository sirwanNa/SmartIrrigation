import { ISensorLogRepository } from '../../core/application/interface/repositories/iSensorLogRepository';
import { SensorLogDTO } from '../../core/application/dTOs/sensorLogDTO';
import { List } from '../../share/utilities/list';
import { BaseRepository } from './baseRepository';
import { Filter } from 'mongodb';
import { SensorLog } from '../../core/domain/entities/sensorLog';
import { Mapper } from '../../share/utilities/mapper';
import { MongoContext } from "../data/mongoContext";


export class SensorLogRepository extends BaseRepository<SensorLog> implements ISensorLogRepository {
 
  constructor(context: MongoContext){
      super(context, 'sensorLogs');
    }

  public async getSensorLogAsync(id: number): Promise<SensorLogDTO> {
    const entity:SensorLog |null = await this.getById(id);
    if (!entity) throw new Error(`SensorLog with ID ${id} not found`);
    return Mapper.Map<SensorLog,SensorLogDTO>(entity);
  }

  public async getSensorLogsListAsync(sensorId:number): Promise<List<SensorLogDTO>> {
    var filter = {sensorId} as Filter<SensorLog>;
    const entities = await this.getAll(filter);
    const list = new List<SensorLogDTO>(entities);    
    return list;
  }

  public async createAsync(sensorLog: SensorLogDTO): Promise<boolean> {
    const existing = await this.getById(sensorLog.id);
    if (existing) return false;  
    // let field:FieldDTO = await this.getField(sensorLog.sensorId);  
    // let weatherLog:SensorLogDTO = await this.getWeather(field.id);    
    // let irrigationLogRepository:IIrrigationLogRepository = new IrrigationLogRepository(this.uow);
    // let lastIrrigationLog:IrrigationLog | undefined = (await irrigationLogRepository.getIrrigationLogsListAsync(field.id)).orderByDesc(p=>p.createdDate).firstItem(); 
    // if(lastIrrigationLog === undefined) throw new Error("IrrigationLog Not Found");  
    //await this.uow.start()
    const entity = Mapper.Map<SensorLog,SensorLogDTO>(sensorLog);
    let sensorLogCreated:boolean = await this.create(entity);
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
  // private async getField(sensorId:number):Promise<FieldDTO>{
  //     const sensorRepository:ISensorRepository = new SensorRepository(this.uow);
  //     const sensor:SensorDTO = await sensorRepository.getSensorAsync(sensorId);
  //     if (sensor === undefined) throw new Error("Sensor Not Found");
  //     const fieldRepository:FieldRepository = new FieldRepository(this.uow);
  //     const field:FieldDTO = await fieldRepository.getFieldAsync(sensor.fieldId);
  //     if (field === undefined) throw new Error("Field Not Found");
  //     return field;
  // }
  // private async getWeather(fieldId:number):Promise<SensorLogDTO>{
  //     let sensorRepository:ISensorRepository = new SensorRepository(this.uow);
  //     let sensor:SensorDTO | undefined = (await sensorRepository.getSensorsListAsync(fieldId))
  //                            .filter(p=>p.sensorType === SensorType.AirTemperature)
  //                            .orderByDesc(p=>p.createdDate)
  //                            .firstItem();
  //     if(sensor === undefined) throw new Error('Weather sensor in this field did not find');    
  //     let weatherLog:SensorLogDTO | undefined = (await this.getSensorLogsListAsync(sensor.id)).firstItem();   
  //     if(weatherLog === undefined) throw new Error('Weather log did not found');                
  //     return weatherLog;    

  // }

}
