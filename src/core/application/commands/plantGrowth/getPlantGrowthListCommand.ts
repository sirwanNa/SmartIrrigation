import { ICommand } from '../iCommand';
import { IPlantGrowthRepository } from '../../interface/repositories/iPlantGrowthRepository';
import { PlantGrowthDTO } from '../../dTOs/plantGrowthDTO';
import { List } from '../../../../share/utilities/list';

export class GetPlantGrowthListCommand implements ICommand {
  constructor(
    private readonly plantGrowthRepository: IPlantGrowthRepository,
    public fieldId: number
  ) {}

  public async executeAsync(): Promise<List<PlantGrowthDTO>> {
    return this.plantGrowthRepository.getPlantGrowthListAsync(this.fieldId);
  }
}
