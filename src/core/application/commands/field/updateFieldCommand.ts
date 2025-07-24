import { ICommand } from '../iCommand';
import { IFieldRepository } from '../../interface/repositories/iFieldRepository';
import { FieldDTO } from '../../dTOs/fieldDTO';
import { IUnitOfWork } from '../../../../infrastructure/data/iunitofWork';

export class UpdateFieldCommand implements ICommand {  
  public fieldData?: FieldDTO;

  constructor(private readonly uow:IUnitOfWork,private readonly fieldRepository: IFieldRepository) {
   
  }

  public async executeAsync(): Promise<boolean> {
    if (!this.fieldData) {
      throw new Error('Field data is undefined');
    }
    this.uow.start();
    let result:boolean = await this.fieldRepository.updateAsync(this.fieldData);
    this.uow.complete();   
    return result;   
  }
}
