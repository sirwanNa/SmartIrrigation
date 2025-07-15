import { ICommand } from '../iCommand';
import { IFieldRepository } from '../../interface/repositories/iFieldRepository';
import { FieldDTO } from '../../dTOs/fieldDTO';
import { List } from '../../../../share/utilities/list';

export class GetFieldsListCommand implements ICommand {
  constructor(
    private readonly fieldRepository: IFieldRepository,
    public farmId: number
  ) {}

  public async executeAsync(): Promise<List<FieldDTO>> {
    return this.fieldRepository.getFieldsListAsync(this.farmId);
  }
}
