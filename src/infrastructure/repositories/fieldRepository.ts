import { IFieldRepository } from '../../core/application/interface/repositories/iFieldRepository';
import { FieldDTO } from '../../core/application/dTOs/fieldDTO';
import { List } from '../../share/utilities/list';

export class FieldRepository implements IFieldRepository {
  private Fields: FieldDTO[] = [];

  public async getFieldAsync(id: number): Promise<FieldDTO> {
    const Field = this.Fields.find(f => f.id === id);
    if (!Field) {
      throw new Error(`Field with ID ${id} not found`);
    }
    return Field;
  }

  public async getFieldsListAsync(farmdId:number): Promise<List<FieldDTO>> {
    const list = new List<FieldDTO>();    
    return list;
  }

  public async createAsync(Field: FieldDTO): Promise<boolean> {
    const exists = this.Fields.some(f => f.id === Field.id);
    if (exists) return false;

    this.Fields.push(Field);
    return true;
  }

  public async updateAsync(Field: FieldDTO): Promise<boolean> {
    const index = this.Fields.findIndex(f => f.id === Field.id);
    if (index === -1) return false;

    this.Fields[index] = Field;
    return true;
  }

  public async removeAsync(id: number): Promise<boolean> {
    const index = this.Fields.findIndex(f => f.id === id);
    if (index === -1) return false;

    this.Fields.splice(index, 1);
    return true;
  }
}
