import { IPlantGrowthRepository } from '../../core/application/interface/repositories/iPlantGrowthRepository';
import { PlantGrowthDTO } from '../../core/application/dTOs/plantGrowthDTO';
import { List } from '../../share/utilities/list';
import { BaseRepository } from './baseRepository';
import { Filter } from 'mongodb';
import {PlantGrowth} from '../../core/domain/entities/plantGrowth'
import { Mapper } from '../../share/utilities/mapper';
import { MongoContext } from "../data/mongoContext";

export class PlantGrowthRepository extends BaseRepository<PlantGrowth> implements IPlantGrowthRepository {
  constructor(context: MongoContext) {
    super(context, 'plantGrowth');
  }

  public async getPlantGrowthAsync(id: number): Promise<PlantGrowthDTO> {
    const entity = await this.getById(id);
    if (!entity) throw new Error(`PlantGrowth with ID ${id} not found`);   
    return Mapper.Map<PlantGrowth,PlantGrowthDTO>(entity);
  }

  public async getPlantGrowthListAsync(fieldId:number): Promise<List<PlantGrowthDTO>> {
    var filter = {fieldId} as Filter<PlantGrowth>;
    const entities = await this.getAll(filter);
    const list = new List<PlantGrowthDTO>(entities);    
    return list;
  }

  public async createAsync(plantGrowth: PlantGrowthDTO): Promise<boolean> {
    const existing = await this.getById(plantGrowth.id);
    if (existing) return false;   
    const entity = Mapper.Map<PlantGrowthDTO,PlantGrowth>(plantGrowth);
    return await this.create(entity);
  }

  public async updateAsync(plantGrowth: PlantGrowthDTO): Promise<boolean> {
    await this.checkObjectIsExist(plantGrowth.id);   
    const entity = Mapper.Map<PlantGrowthDTO,PlantGrowth>(plantGrowth);
    return await this.update(entity);
  }

  public async removeAsync(id: number): Promise<boolean> {
     await this.checkObjectIsExist(id);
     return await this.delete(id);
  }
}
