import { ISensorLogRepository } from '../../core/application/interface/repositories/iSensorLogRepository';
import { SensorLogDTO } from '../../core/application/dTOs/sensorLogDTO';
import { List } from '../../share/utilities/list';
import { BaseRepository } from './baseRepository';
import { UnitOfWork } from '../data/unitofWork';
import { Filter } from 'mongodb';
import { SensorLog } from '../../core/domain/entities/sensorLog';
import { Mapper } from '../../share/utilities/mapper';
import { IrrigationLog } from '../../core/domain/entities/irrigationLog';
import { IrrigationLogRepository } from './irrigationLogRepository';
import { IDataSetRepository } from '../../core/application/interface/repositories/iDataSetRepository';
import { DataSetDTO } from '../../core/application/dTOs/dataSetDTO';
import { FieldRepository } from './fieldRepository';

export class SensorLogRepository extends BaseRepository<SensorLog> implements ISensorLogRepository {
 
  constructor(uow: UnitOfWork,
    private readonly irrigationLog:IrrigationLogRepository,
    private readonly dataSetRepository:IDataSetRepository,
    private readonly fieldRepository:FieldRepository){
      super(uow, 'sensorLogs');
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

    let lastIrrigation:IrrigationLog=(await this.irrigationLog.getAll()).filter((row:IrrigationLog,index:number)=>row.endDate !== undefined)
      .sort((a, b) => {
        return new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime()
      })[0];
      if(lastIrrigation !== undefined){
        const entity = Mapper.Map<SensorLog,SensorLogDTO>(sensorLog);
        await this.uow.start()
        let sensorLogCreated:boolean = await this.create(entity);
        let dataSet:DataSetDTO = {
          id:1,
          createdDate : new Date(),
          soilType:,
          cropType:,
          landSlope:,
          month:,
          temperature:,
          estimated_Time:,
        };
        let dataSetCreated:boolean = await this.dataSetRepository.createAsync(dataSet)
        this.uow.complete();
        return sensorLogCreated && dataSetCreated;
      }
      return false;

  }

}
