import { IFieldRepository } from '../../core/application/interface/repositories/iFieldRepository';
import { FieldDTO } from '../../core/application/dTOs/fieldDTO';
import { List } from '../../share/utilities/list';
import { BaseRepository } from './baseRepository';
import { UnitOfWork } from '../data/unitofWork';
import { Field } from '../../core/domain/entities/field';
import { Filter } from 'mongodb';

export class FieldRepository extends BaseRepository<Field> implements IFieldRepository {
    constructor(uow: UnitOfWork) {
    super(uow, 'fields');
  }

  private toDTO(entity: Field): FieldDTO {
    const { id, name, createdDate,cropType,soilType,areaSize,latitude,longitude,farmId,cultivationDate,landSlope } = entity;
    return { id, name, createdDate,cropType,soilType,areaSize,latitude,longitude,farmId,cultivationDate,landSlope };
  }

  private fromDTO(dto: FieldDTO): Field {
    const { id, name, createdDate,cropType,soilType,areaSize,latitude,longitude,farmId,cultivationDate,landSlope } = dto;
    return { id, name, createdDate,cropType,soilType,areaSize,latitude,longitude,farmId,cultivationDate,landSlope };
  }

  public async getFieldAsync(id: number): Promise<FieldDTO> {
    const entity = await this.getById(id);
    if (!entity) throw new Error(`Field with ID ${id} not found`);
    return this.toDTO(entity);
  }

  public async getFieldsListAsync(farmdId:number): Promise<List<FieldDTO>> {
    var filter = {farmdId} as Filter<Field>;
    const entities = await this.getAll(filter);
    const list = new List<FieldDTO>(entities);    
    return list;
  }

  public async createAsync(field: FieldDTO): Promise<boolean> {
    const existing = await this.getById(field.id);
    if (existing) return false;
    const entity = this.fromDTO(field);
    return await this.create(entity);
  }

  public async updateAsync(field: FieldDTO): Promise<boolean> {
    await this.checkObjectIsExist(field.id);
    const entity = this.fromDTO(field);
    return await this.update(entity);
  }

  public async removeAsync(id: number): Promise<boolean> {
     await this.checkObjectIsExist(id);
     return await this.delete(id);
  }
}
