import { ICommand } from '../iCommand';
import { IPlantGrowthRepository } from '../../interface/repositories/iPlantGrowthRepository';
import { PlantGrowthDTO } from '../../dTOs/plantGrowthDTO';

export class CreatePlantGrowthCommand implements ICommand {
  private _plantGrowthRepository: IPlantGrowthRepository;
  public plantGrowthData?: PlantGrowthDTO;

  constructor(plantGrowthRepository: IPlantGrowthRepository) {
    this._plantGrowthRepository = plantGrowthRepository;
  }

  public async executeAsync(): Promise<boolean> {
    if (!this.plantGrowthData) {
      throw new Error('PlantGrowth data is undefined');
    }
    return await this._plantGrowthRepository.createAsync(this.plantGrowthData);
  }
}
