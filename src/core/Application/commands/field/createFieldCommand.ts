import { ICommand } from '../iCommand';
import { IFieldRepository } from '../../interface/repositories/iFieldRepository';
import { FieldDTO } from '../../dTOs/fieldDTO';

export class CreateFieldCommand implements ICommand {
  private _fieldRepository: IFieldRepository;
  public fieldData?: FieldDTO;

  constructor(fieldRepository: IFieldRepository) {
    this._fieldRepository = fieldRepository;
  }

  public async executeAsync(): Promise<boolean> {
    if (!this.fieldData) {
      throw new Error('Field data is undefined');
    }
    return await this._fieldRepository.createAsync(this.fieldData);
  }
}
