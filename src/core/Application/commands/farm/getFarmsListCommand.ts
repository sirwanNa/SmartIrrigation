import {ICommand} from '../iCommand'
import {IFarmRepository} from '../../interface/repositories/iFarmRepository'
import {FarmDTO} from '../../dTOs/FarmDTO'
import {List} from '../../../../share/utilities/list'

 export class GetFarmsListCommand implements ICommand{
    private  _farmRepository:IFarmRepository;   
    constructor(farmRepository:IFarmRepository){
        this._farmRepository = farmRepository
    }
    public executeAsync(): Promise<List<FarmDTO>> {
        return this._farmRepository.getFarmsListAsync();             
    }
 }