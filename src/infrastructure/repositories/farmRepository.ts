import { IFarmRepository } from '../../core/application/interface/repositories/iFarmRepository';
import { FarmDTO } from '../../core/application/dTOs/farmDTO';
import { List } from '../../share/utilities/list';

export class FarmRepository implements IFarmRepository {
  private farms: FarmDTO[] = [];

  public async getFarmAsync(id: number): Promise<FarmDTO> {
    const farm = this.farms.find(f => f.id === id);
    if (!farm) {
      throw new Error(`Farm with ID ${id} not found`);
    }
    return farm;
  }

  public async getFarmsListAsync(): Promise<List<FarmDTO>> {
    const list = new List<FarmDTO>();    
    return list;
  }

  public async createAsync(farm: FarmDTO): Promise<boolean> {
    const exists = this.farms.some(f => f.id === farm.id);
    if (exists) return false;

    this.farms.push(farm);
    return true;
  }

  public async updateAsync(farm: FarmDTO): Promise<boolean> {
    const index = this.farms.findIndex(f => f.id === farm.id);
    if (index === -1) return false;

    this.farms[index] = farm;
    return true;
  }

  public async removeAsync(id: number): Promise<boolean> {
    const index = this.farms.findIndex(f => f.id === id);
    if (index === -1) return false;

    this.farms.splice(index, 1);
    return true;
  }
}
