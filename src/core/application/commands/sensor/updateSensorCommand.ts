import { ICommand } from '../iCommand';
import { ISensorRepository } from '../../interface/repositories/iSensorRepository';
import { SensorDTO } from '../../dTOs/sensorDTO';

export class UpdateSensorCommand implements ICommand {
  private _sensorRepository: ISensorRepository;
  public sensorData?: SensorDTO;

  constructor(SensorRepository: ISensorRepository) {
    this._sensorRepository = SensorRepository;
  }

  public async executeAsync(): Promise<boolean> {
    if (!this.sensorData) {
      throw new Error('Sensor data is undefined');
    }
    return await this._sensorRepository.updateAsync(this.sensorData);
  }
}
