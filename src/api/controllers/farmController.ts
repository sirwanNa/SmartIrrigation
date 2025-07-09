
import {GetFarmCommand} from '../../core/Application/commands/farm/getFarmCommand'
import {IFarmRepository} from '../../core/Application/interface/repositories/iFarmRepository'
import {FarmDTO} from '../../core/Application/dTOs/FarmDTO'

export class FarmController{
     private _farmRepository:IFarmRepository;
     constructor(farmRepository:IFarmRepository){
        this._farmRepository = farmRepository;
     }
    getFarm =(req:any, res:any):FarmDTO=>{
       var command:GetFarmCommand = new GetFarmCommand(this._farmRepository);
       let result:FarmDTO=command.execute();
       return result;
    }   

}