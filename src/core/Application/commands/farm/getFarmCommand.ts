import {ICommand} from '../iCommand'
import {IFarmRepository} from '../../interface/repositories/iFarmRepository'
import {FarmDTO} from '../../dTOs/farmDTO'

 export class GetFarmCommand implements ICommand{
    private  _farmRepository:IFarmRepository;
    public FarmId?:number;
    constructor(farmRepository:IFarmRepository){
        this._farmRepository = farmRepository
    }
    public executeAsync(): Promise<FarmDTO> {
        if(this.FarmId === undefined) throw new Error('Id is undefined');
        return this._farmRepository.getFarmAsync(this.FarmId);             
    }
 }
