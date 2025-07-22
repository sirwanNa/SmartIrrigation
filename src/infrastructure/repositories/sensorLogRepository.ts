import { ISensorLogRepository } from '../../core/application/interface/repositories/iSensorLogRepository';
import { SensorLogDTO } from '../../core/application/dTOs/sensorLogDTO';
import { List } from '../../share/utilities/list';
import { BaseRepository } from './baseRepository';
import { UnitOfWork } from '../data/unitofWork';
import { Filter } from 'mongodb';
import { SensorLog } from '../../core/domain/entities/sensorLog';
import { Mapper } from '../../share/utilities/mapper';

export class SensorLogRepository extends BaseRepository<SensorLog> implements ISensorLogRepository {
 
  constructor(uow: UnitOfWork) {
    super(uow, 'sensorLogs');
  }
    // private toDTO(entity: SensorLog): SensorLogDTO {
    //   const { id, createdDate,sensorId,value,batteryLevel,signalStrength } = entity;
    //   return { id, createdDate,sensorId,value,batteryLevel,signalStrength  };
    // }
  
    // private fromDTO(dto: SensorLogDTO): SensorLog {
    //   const { id, createdDate,sensorId,value,batteryLevel,signalStrength  } = dto;
    //   return {id, createdDate,sensorId,value,batteryLevel,signalStrength  };
    // }

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
    // const entity = this.fromDTO(sensorLog);
    const entity = Mapper.Map<SensorLog,SensorLogDTO>(sensorLog);
    return await this.create(entity);
  }

}
