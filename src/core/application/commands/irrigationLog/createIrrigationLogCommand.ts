import { ICommand } from '../iCommand';
import { IIrrigationLogRepository } from '../../interface/repositories/iIrrigationLogRepository';
import { IrrigationLogDTO } from '../../dTOs/irrigationLogDTO';
import { IUnitOfWork } from '../../../../infrastructure/data/iunitofWork';

export class CreateIrrigationLogCommand implements ICommand {  
  public irrigationLogData?: IrrigationLogDTO;

  constructor(private readonly uow:IUnitOfWork,private readonly irrigationLogRepository: IIrrigationLogRepository) {
    
  }

  public async executeAsync(): Promise<boolean> {
    if (!this.irrigationLogData) {
      throw new Error('IrrigationLog data is undefined');
    }
    this.uow.start();
    let result:boolean = await this.irrigationLogRepository.createAsync(this.irrigationLogData);
    this.uow.complete();   
    return result; 
  }
}
