import { IIrrigationLogRepository } from '../../core/application/interface/repositories/iIrrigationLogRepository';
import { IrrigationLogDTO } from '../../core/application/dTOs/irrigationLogDTO';
import { List } from '../../share/utilities/list';
import { BaseRepository } from './baseRepository';
import { IrrigationLog } from '../../core/domain/entities/irrigationLog';
import { Filter } from 'mongodb';
import { Mapper } from '../../share/utilities/mapper';
import { MongoContext } from "../data/mongoContext";

export class IrrigationLogRepository extends BaseRepository<IrrigationLog> implements IIrrigationLogRepository {
    constructor(context: MongoContext) {
      super(context, 'irrigationLogs');
    }

  public async getIrrigationLogAsync(id: number): Promise<IrrigationLogDTO> {
    const entity = await this.getById(id);
    if (!entity) throw new Error(`IrrigationLog with ID ${id} not found`);   
     return Mapper.Map<IrrigationLog,IrrigationLogDTO>(entity);
  }

  public async getIrrigationLogsListAsync(fieldId:number): Promise<List<IrrigationLogDTO>> {
    var filter = {fieldId} as Filter<IrrigationLog>;
    const entities = await this.getAll(filter);
    const list = new List<IrrigationLogDTO>(entities);    
    return list;
  }

  public async createAsync(iIrrigationLog: IrrigationLogDTO): Promise<boolean> {
    const existing = await this.getById(iIrrigationLog.id);
    if (existing) return false;  
    const entity = Mapper.Map<IrrigationLogDTO,IrrigationLog>(iIrrigationLog);
    return await this.create(entity);
  }

}
