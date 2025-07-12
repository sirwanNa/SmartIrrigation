import { IPlantGrowthRepository } from '../../core/application/interface/repositories/iPlantGrowthRepository';
import { PlantGrowthDTO } from '../../core/application/dTOs/plantGrowthDTO';
import { List } from '../../share/utilities/list';

export class PlantGrowthRepository implements IPlantGrowthRepository {
  private PlantGrowths: PlantGrowthDTO[] = [];

  public async getPlantGrowthAsync(id: number): Promise<PlantGrowthDTO> {
    const PlantGrowth = this.PlantGrowths.find(f => f.id === id);
    if (!PlantGrowth) {
      throw new Error(`PlantGrowth with ID ${id} not found`);
    }
    return PlantGrowth;
  }

  public async getPlantGrowthListAsync(): Promise<List<PlantGrowthDTO>> {
    const list = new List<PlantGrowthDTO>();    
    return list;
  }

  public async createAsync(PlantGrowth: PlantGrowthDTO): Promise<boolean> {
    const exists = this.PlantGrowths.some(f => f.id === PlantGrowth.id);
    if (exists) return false;

    this.PlantGrowths.push(PlantGrowth);
    return true;
  }

  public async updateAsync(PlantGrowth: PlantGrowthDTO): Promise<boolean> {
    const index = this.PlantGrowths.findIndex(f => f.id === PlantGrowth.id);
    if (index === -1) return false;

    this.PlantGrowths[index] = PlantGrowth;
    return true;
  }

  public async removeAsync(id: number): Promise<boolean> {
    const index = this.PlantGrowths.findIndex(f => f.id === id);
    if (index === -1) return false;

    this.PlantGrowths.splice(index, 1);
    return true;
  }
}
