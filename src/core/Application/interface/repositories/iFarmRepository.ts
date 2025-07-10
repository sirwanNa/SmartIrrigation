
import {FarmDTO} from '../../dTOs/FarmDTO'
import {List} from '../../../../share/utilities/list'

export interface IFarmRepository{
    getFarmAsync(id:number):Promise<FarmDTO>;  
    getFarmsListAsync():Promise<List<FarmDTO>>;
    createAsync(farm:FarmDTO):Promise<boolean>;  
    updateAsync(farm:FarmDTO):Promise<boolean>;
    removeAsync(id:number):Promise<boolean>;  
}