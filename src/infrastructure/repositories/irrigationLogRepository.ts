import { IIrrigationLogRepository } from '../../core/application/interface/repositories/iIrrigationLogRepository';
import { IrrigationLogDTO } from '../../core/application/dTOs/irrigationLogDTO';
import { List } from '../../share/utilities/list';

export class IrrigationLogRepository implements IIrrigationLogRepository {
  private irrigationLogs: IrrigationLogDTO[] = [];

  public async getIrrigationLogAsync(id: number): Promise<IrrigationLogDTO> {
    const IrrigationLog = this.irrigationLogs.find(f => f.id === id);
    if (!IrrigationLog) {
      throw new Error(`IrrigationLog with ID ${id} not found`);
    }
    return IrrigationLog;
  }

  public async getIrrigationLogsListAsync(irrigationId:number): Promise<List<IrrigationLogDTO>> {
    const list = new List<IrrigationLogDTO>();    
    return list;
  }

  public async createAsync(IrrigationLog: IrrigationLogDTO): Promise<boolean> {
    this.irrigationLogs.push(IrrigationLog);
    return true;
  }

}
