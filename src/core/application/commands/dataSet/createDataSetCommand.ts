import { ICommand } from '../iCommand';
import { IDataSetRepository } from '../../interface/repositories/iDataSetRepository';
import { DataSetDTO } from '../../dTOs/dataSetDTO';

export class CreateDataSetCommand implements ICommand {
  private _dataSetRepository: IDataSetRepository;
  public dataSetData?: DataSetDTO;

  constructor(DataSetRepository: IDataSetRepository) {
    this._dataSetRepository = DataSetRepository;
  }

  public async executeAsync(): Promise<boolean> {
    if (!this.dataSetData) {
      throw new Error('DataSet data is undefined');
    }
    return await this._dataSetRepository.createAsync(this.dataSetData);
  }
}
