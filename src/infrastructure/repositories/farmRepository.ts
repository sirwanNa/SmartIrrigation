import {IFarmRepository} from '../../core/Application/interface/repositories/iFarmRepository'
import {FarmDTO} from '../../core/Application/dTOs/FarmDTO'
import {List} from '../../share/utilities/list'

export class FarmRepository implements IFarmRepository {
  private farms: FarmDTO[] = [];

  getFarm(id: number): FarmDTO {
    const farm = this.farms.find(f => f.farmId === id);
    if (!farm) {
      throw new Error(`Farm with ID ${id} not found`);
    }
    return farm;
  }

  getFarmsList(): List<FarmDTO> {
    return new List<FarmDTO>();
  }

  create(farm: FarmDTO): boolean {
    const exists = this.farms.some(f => f.farmId === farm.farmId);
    if (exists) return false;

    this.farms.push(farm);
    return true;
  }

  update(farm: FarmDTO): boolean {
    const index = this.farms.findIndex(f => f.farmId === farm.farmId);
    if (index === -1) return false;

    this.farms[index] = farm;
    return true;
  }

  remove(id: number): boolean {
    const index = this.farms.findIndex(f => f.farmId === id);
    if (index === -1) return false;

    this.farms.splice(index, 1);
    return true;
  }
}