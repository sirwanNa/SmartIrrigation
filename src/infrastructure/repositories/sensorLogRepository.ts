import { ISensorLogRepository } from '../../core/Application/interface/repositories/iSensorLogRepository';
import { SensorLogDTO } from '../../core/Application/dTOs/sensorLogDTO';
import { List } from '../../share/utilities/list';

export class SensorLogRepository implements ISensorLogRepository {
  private SensorLogs: SensorLogDTO[] = [];

  public async getSensorLogAsync(id: number): Promise<SensorLogDTO> {
    const SensorLog = this.SensorLogs.find(f => f.sensorLogId === id);
    if (!SensorLog) {
      throw new Error(`SensorLog with ID ${id} not found`);
    }
    return SensorLog;
  }

  public async getSensorLogsListAsync(): Promise<List<SensorLogDTO>> {
    const list = new List<SensorLogDTO>();    
    return list;
  }

  public async createAsync(SensorLog: SensorLogDTO): Promise<boolean> {
    const exists = this.SensorLogs.some(f => f.sensorLogId === SensorLog.sensorLogId);
    if (exists) return false;

    this.SensorLogs.push(SensorLog);
    return true;
  }

}
