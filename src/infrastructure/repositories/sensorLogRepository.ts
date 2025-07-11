import { ISensorLogRepository } from '../../core/application/interface/repositories/iSensorLogRepository';
import { SensorLogDTO } from '../../core/application/dTOs/sensorLogDTO';
import { List } from '../../share/utilities/list';

export class SensorLogRepository implements ISensorLogRepository {
  private SensorLogs: SensorLogDTO[] = [];

  public async getSensorLogAsync(id: number): Promise<SensorLogDTO> {
    const SensorLog = this.SensorLogs.find(f => f.id === id);
    if (!SensorLog) {
      throw new Error(`SensorLog with ID ${id} not found`);
    }
    return SensorLog;
  }

  public async getSensorLogsListAsync(sensorId:number): Promise<List<SensorLogDTO>> {
    const list = new List<SensorLogDTO>();    
    return list;
  }

  public async createAsync(SensorLog: SensorLogDTO): Promise<boolean> {
    this.SensorLogs.push(SensorLog);
    return true;
  }

}
