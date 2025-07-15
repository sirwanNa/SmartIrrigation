import { ICommand } from '../iCommand';
import { IIrrigationLogRepository } from '../../interface/repositories/iIrrigationLogRepository';
import { IrrigationLogDTO } from '../../dTOs/irrigationLogDTO';

export class CreateIrrigationLogCommand implements ICommand {
  private _irrigationLogRepository: IIrrigationLogRepository;
  public irrigationLogData?: IrrigationLogDTO;

  constructor(irrigationLogRepository: IIrrigationLogRepository) {
    this._irrigationLogRepository = irrigationLogRepository;
  }

  public async executeAsync(): Promise<boolean> {
    if (!this.irrigationLogData) {
      throw new Error('IrrigationLog data is undefined');
    }
    return await this._irrigationLogRepository.createAsync(this.irrigationLogData);
  }
}
