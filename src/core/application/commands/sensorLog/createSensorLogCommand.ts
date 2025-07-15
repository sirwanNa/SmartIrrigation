import { ICommand } from '../iCommand';
import { ISensorLogRepository } from '../../interface/repositories/iSensorLogRepository';
import { SensorLogDTO } from '../../dTOs/sensorLogDTO';

export class CreateSensorLogCommand implements ICommand {
  private _SensorLogRepository: ISensorLogRepository;
  public SensorLogData?: SensorLogDTO;

  constructor(SensorLogRepository: ISensorLogRepository) {
    this._SensorLogRepository = SensorLogRepository;
  }

  public async executeAsync(): Promise<boolean> {
    if (!this.SensorLogData) {
      throw new Error('SensorLog data is undefined');
    }
    return await this._SensorLogRepository.createAsync(this.SensorLogData);
  }
}
