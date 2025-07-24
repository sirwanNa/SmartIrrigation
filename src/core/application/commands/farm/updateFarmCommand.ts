import { ICommand } from '../iCommand';
import { IFarmRepository } from '../../interface/repositories/iFarmRepository';
import { FarmDTO } from '../../dTOs/farmDTO';
import { IUnitOfWork } from '../../../../infrastructure/data/iunitofWork';

export class UpdateFarmCommand implements ICommand {
  
  public farmData?: FarmDTO;

  constructor(private readonly uow:IUnitOfWork,private readonly farmRepository: IFarmRepository) {
    
  }

  public async executeAsync(): Promise<boolean> {
    if (!this.farmData) {
      throw new Error('Farm data is undefined');
    }
     this.uow.start();
     let result:boolean = await this.farmRepository.updateAsync(this.farmData);
     this.uow.complete();   
     return result; 
  }
}
