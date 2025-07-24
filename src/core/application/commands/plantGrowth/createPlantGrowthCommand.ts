import { ICommand } from '../iCommand';
import { IPlantGrowthRepository } from '../../interface/repositories/iPlantGrowthRepository';
import { PlantGrowthDTO } from '../../dTOs/plantGrowthDTO';
import { IUnitOfWork } from '../../../../infrastructure/data/iunitofWork';

export class CreatePlantGrowthCommand implements ICommand {
  
  public plantGrowthData?: PlantGrowthDTO;

  constructor(private readonly uow:IUnitOfWork,private readonly plantGrowthRepository: IPlantGrowthRepository) {
    this.plantGrowthRepository = plantGrowthRepository;
  }

  public async executeAsync(): Promise<boolean> {
    if (!this.plantGrowthData) {
      throw new Error('PlantGrowth data is undefined');
    }
     this.uow.start();
     let result:boolean = await this.plantGrowthRepository.createAsync(this.plantGrowthData);
     this.uow.complete();   
     return result; 
  }
}
