import { ICommand } from '../iCommand';
import { ISensorRepository } from '../../interface/repositories/iSensorRepository';
import { SensorDTO } from '../../dTOs/sensorDTO';

export class CreateSensorCommand implements ICommand {
  private _sensorRepository: ISensorRepository;
  public sensorData?: SensorDTO;

  constructor(sensorRepository: ISensorRepository) {
    this._sensorRepository = sensorRepository;
  }

  public async executeAsync(): Promise<boolean> {
    if (!this.sensorData) {
      throw new Error('Sensor data is undefined');
    }
    return await this._sensorRepository.createAsync(this.sensorData);
  }
}
