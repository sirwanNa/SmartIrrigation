import { ICommand } from '../iCommand';
import { ISensorLogRepository } from '../../interface/repositories/iSensorLogRepository';
import { SensorLogDTO } from '../../dTOs/sensorLogDTO';
import { ISensorRepository } from '../../interface/repositories/iSensorRepository';
import { IIrrigationLogRepository } from '../../interface/repositories/iIrrigationLogRepository';
import { IUnitOfWork } from '../../../../infrastructure/data/iunitofWork';
import { FieldDTO } from '../../dTOs/fieldDTO';
import { SensorDTO } from '../../dTOs/sensorDTO';
import { IFieldRepository } from '../../interface/repositories/iFieldRepository';
import { SensorType } from '../../../domain/enums/sensorType';
import { IrrigationLog } from '../../../domain/entities/irrigationLog';
import { DataSetDTO } from '../../dTOs/dataSetDTO';
import { IDataSetRepository } from '../../interface/repositories/iDataSetRepository';
import { IrrigationLogDTO } from '../../dTOs/irrigationLogDTO';

export class CreateSensorLogCommand implements ICommand {
 
  public sensorLogData?: SensorLogDTO;

  constructor(private readonly uow:IUnitOfWork, private readonly sensorLogRepository: ISensorLogRepository,
     private readonly sensorRepository:ISensorRepository,
     private readonly irrigationLogRepository:IIrrigationLogRepository,
     private readonly fieldRepository:IFieldRepository,
     private readonly dataSetRepository:IDataSetRepository
     ) {
   
      }

  public async executeAsync(): Promise<boolean> {
    if (!this.sensorLogData) {
      throw new Error('SensorLog data is undefined');
    }
    let field:FieldDTO = await this.getField(this.sensorLogData.sensorId);
    let weatherLog:SensorLogDTO = await this.getWeather(field.id);  
    let lastIrrigationLog:IrrigationLogDTO | undefined = (await this.irrigationLogRepository.getIrrigationLogsListAsync(field.id))
                              .orderByDesc(p=>p.createdDate).firstItem(); 
    if(lastIrrigationLog === undefined) throw new Error("IrrigationLog Not Found");  
    await this.uow.start();
    let sensorLogCreated:boolean = await this.sensorLogRepository.createAsync(this.sensorLogData);
    let dataSet:DataSetDTO = {
      id:1,
      createdDate : new Date(),
      soilType:field.soilType,
      cropType:field.cropType,
      landSlope:field.landSlope,
      month:new Date().getMonth(),
      temperature:weatherLog.value,
      estimated_Time: ((new Date()).getUTCSeconds() - lastIrrigationLog.createdDate.getUTCSeconds()) ,
    };   
    let dataSetCreated:boolean = await this.dataSetRepository.createAsync(dataSet)
    await this.uow.complete();
    return sensorLogCreated && dataSetCreated;
  }
    private async getField(sensorId:number):Promise<FieldDTO>{     
      const sensor:SensorDTO = await this.sensorRepository.getSensorAsync(sensorId);
      if (sensor === undefined) throw new Error("Sensor Not Found");     
      const field:FieldDTO = await this.fieldRepository.getFieldAsync(sensor.fieldId);
      if (field === undefined) throw new Error("Field Not Found");
      return field;
  }
  private async getWeather(fieldId:number):Promise<SensorLogDTO>{
      
      let sensor:SensorDTO | undefined = (await this.sensorRepository.getSensorsListAsync(fieldId))
                             .filter(p=>p.sensorType === SensorType.AirTemperature)
                             .orderByDesc(p=>p.createdDate)
                             .firstItem();
      if(sensor === undefined) throw new Error('Weather sensor in this field did not find');    
      let weatherLog:SensorLogDTO | undefined = (await this.sensorLogRepository.getSensorLogsListAsync(sensor.id)).firstItem();   
      if(weatherLog === undefined) throw new Error('Weather log did not found');                
      return weatherLog;    

  }
}
