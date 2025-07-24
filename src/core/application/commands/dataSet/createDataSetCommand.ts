import { ICommand } from '../iCommand';
import { IDataSetRepository } from '../../interface/repositories/iDataSetRepository';
import { DataSetDTO } from '../../dTOs/dataSetDTO';
import { IUnitOfWork } from '../../../../infrastructure/data/iunitofWork';

export class CreateDataSetCommand implements ICommand {
  public dataSetData?: DataSetDTO;

  constructor(private readonly uow:IUnitOfWork,private dataSetRepository: IDataSetRepository) {
    
  }

  public async executeAsync(): Promise<boolean> {
    if (!this.dataSetData) {
      throw new Error('DataSet data is undefined');
    }
    this.uow.start();
    let result:boolean = await this.dataSetRepository.createAsync(this.dataSetData);
    this.uow.complete();   
    return result; 
  }
}
