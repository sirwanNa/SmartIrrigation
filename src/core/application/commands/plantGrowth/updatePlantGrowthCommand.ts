import { ICommand } from '../iCommand';
import { IPlantGrowthRepository } from '../../interface/repositories/iPlantGrowthRepository';
import { PlantGrowthDTO } from '../../dTOs/plantGrowthDTO';

export class UpdatePlantGrowthCommand implements ICommand {
  private _plantGrowthRepository: IPlantGrowthRepository;
  public plantGrowthData?: PlantGrowthDTO;

  constructor(PlantGrowthRepository: IPlantGrowthRepository) {
    this._plantGrowthRepository = PlantGrowthRepository;
  }

  public async executeAsync(): Promise<boolean> {
    if (!this.plantGrowthData) {
      throw new Error('PlantGrowth data is undefined');
    }
    return await this._plantGrowthRepository.updateAsync(this.plantGrowthData);
  }
}
