import { IFarmRepository } from '../../core/application/interface/repositories/iFarmRepository';
import { FarmDTO } from '../../core/application/dTOs/farmDTO';
import { List } from '../../share/utilities/list';
import { BaseRepository } from './baseRepository';
import { Farm } from '../../core/domain/entities/farm';
import { Mapper } from '../../share/utilities/mapper';
import { MongoContext } from '../data/mongoContext';

export class FarmRepository extends BaseRepository<Farm> implements IFarmRepository {
  constructor(context: MongoContext) {
    super(context, 'farms');
  }

  public async getFarmAsync(id: number): Promise<FarmDTO> {
    const entity = await this.getById(id);
    if (!entity) throw new Error(`Farm with ID ${id} not found`);   
    return Mapper.Map<Farm,FarmDTO>(entity);
  }

  public async getFarmsListAsync(): Promise<List<FarmDTO>> {
    const entities = await this.getAll();
    const list = new List<FarmDTO>(entities);    
    return list;
  }

  public async createAsync(farm: FarmDTO): Promise<boolean> {
    const existing = await this.getById(farm.id);
    if (existing) return false;   
    const entity = Mapper.Map<FarmDTO,Farm>(farm);
    return await this.create(entity);
  }

  public async updateAsync(farm: FarmDTO): Promise<boolean> {
    await this.checkObjectIsExist(farm.id);    
    const entity = Mapper.Map<FarmDTO,Farm>(farm);
    return await this.update(entity);
  }

  public async removeAsync(id: number): Promise<boolean> {
    await this.checkObjectIsExist(id);
    return await this.delete(id);
  }
}
