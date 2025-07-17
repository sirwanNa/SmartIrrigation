import { IIrrigationLogRepository } from '../../core/application/interface/repositories/iIrrigationLogRepository';
import { IrrigationLogDTO } from '../../core/application/dTOs/irrigationLogDTO';
import { List } from '../../share/utilities/list';
import { BaseRepository } from './baseRepository';
import { UnitOfWork } from '../data/unitofWork';
import { IrrigationLog } from '../../core/domain/entities/irrigationLog';
import { Filter } from 'mongodb';

export class IrrigationLogRepository extends BaseRepository<IrrigationLog> implements IIrrigationLogRepository {
    constructor(uow: UnitOfWork) {
      super(uow, 'irrigationLogs');
    }
    private toDTO(entity: IrrigationLog): IrrigationLogDTO {
      const { id, createdDate,fieldId, startDate,endDate } = entity;
      return { id, createdDate,fieldId, startDate,endDate };
    }
  
    private fromDTO(dto: IrrigationLogDTO): IrrigationLog {
      const { id,createdDate,fieldId, startDate,endDate } = dto;
      return { id, createdDate,fieldId, startDate,endDate };
    }

  public async getIrrigationLogAsync(id: number): Promise<IrrigationLogDTO> {
    const entity = await this.getById(id);
    if (!entity) throw new Error(`IrrigationLog with ID ${id} not found`);
    return this.toDTO(entity);
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
    const entity = this.fromDTO(iIrrigationLog);
    return await this.create(entity);
  }

}
