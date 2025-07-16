import { IFarmRepository } from '../../core/application/interface/repositories/iFarmRepository';
import { FarmDTO } from '../../core/application/dTOs/farmDTO';
import { List } from '../../share/utilities/list';
import { BaseRepository } from './baseRepository';
import { Farm } from '../../core/domain/entities/farm';
import { UnitOfWork } from '../data/unitofWork';

export class FarmRepository extends BaseRepository<Farm> implements IFarmRepository {
  constructor(uow: UnitOfWork) {
    super(uow, 'farms');
  }

  private toDTO(entity: Farm): FarmDTO {
    const { id, name, createdDate,farmType,irrigationType } = entity;
    return { id, name, createdDate,farmType,irrigationType };
  }

  private fromDTO(dto: FarmDTO): Farm {
    const { id, name, createdDate,farmType,irrigationType } = dto;
    return { id, name,  createdDate,farmType,irrigationType };
  }

  public async getFarmAsync(id: number): Promise<FarmDTO> {
    const entity = await this.getById(id);
    if (!entity) throw new Error(`Farm with ID ${id} not found`);
    return this.toDTO(entity);
  }

  public async getFarmsListAsync(): Promise<List<FarmDTO>> {
    const entities = await this.getAll();
    const list = new List<FarmDTO>();
    entities.forEach(e => list.add(this.toDTO(e)));
    return list;
  }

  public async createAsync(farm: FarmDTO): Promise<boolean> {
    const existing = await this.getById(farm.id);
    if (existing) return false;
    const entity = this.fromDTO(farm);
    return await this.create(entity);
  }

  public async updateAsync(farm: FarmDTO): Promise<boolean> {
    const entity = this.fromDTO(farm);
    return await this.update(entity);
  }

  public async removeAsync(id: number): Promise<boolean> {
    return await this.delete(id);
  }
}
