import {ICommand} from '../iCommand'
import { IDataSetRepository } from '../../interface/repositories/iDataSetRepository';
import {DataSetDTO} from '../../dTOs/dataSetDTO'
import { List } from '../../../../share/utilities/list';

 export class GetDataSetCommand implements ICommand{
    private  _dataSetRepository:IDataSetRepository;
    public FarmId?:number;
    constructor(farmRepository:IDataSetRepository){
        this._dataSetRepository = farmRepository
    }
    public executeAsync(): Promise<List<DataSetDTO>> {        
        return this._dataSetRepository.getDataSetAsync();             
    }
 }
