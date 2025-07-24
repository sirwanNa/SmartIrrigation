import { ICommand } from '../iCommand';
import { ISensorRepository } from '../../interface/repositories/iSensorRepository';
import { SensorDTO } from '../../dTOs/sensorDTO';
import { IUnitOfWork } from '../../../../infrastructure/data/iunitofWork';

export class UpdateSensorCommand implements ICommand {
  
  public sensorData?: SensorDTO;

  constructor(private readonly uow:IUnitOfWork,private readonly sensorRepository: ISensorRepository) {
   
  }

  public async executeAsync(): Promise<boolean> {
    if (!this.sensorData) {
      throw new Error('Sensor data is undefined');
    }
    this.uow.start();
    let result:boolean= await this.sensorRepository.updateAsync(this.sensorData);
    this.uow.complete();   
    return result;  
  }
}
