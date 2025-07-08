
import {FarmDTO} from '../../dTOs/FarmDTO'
import {List} from '../../../../share/utilities/list'

export interface IFarmRepository{
    getFarm(id:number):FarmDTO;  
    getFarmsList():List<FarmDTO>;
    create(farm:FarmDTO):boolean;  
    update(farm:FarmDTO):boolean;
    remove(id:number):boolean;  
}