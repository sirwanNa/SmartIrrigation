import { ICommand } from '../iCommand';
import { IFarmRepository } from '../../interface/repositories/iFarmRepository';
import { FarmDTO } from '../../dTOs/farmDTO';

export class UpdateFarmCommand implements ICommand {
  private _farmRepository: IFarmRepository;
  public farmData?: FarmDTO;

  constructor(farmRepository: IFarmRepository) {
    this._farmRepository = farmRepository;
  }

  public async executeAsync(): Promise<boolean> {
    if (!this.farmData) {
      throw new Error('Farm data is undefined');
    }
    return await this._farmRepository.updateAsync(this.farmData);
  }
}
