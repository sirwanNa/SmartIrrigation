import {ICommand} from '../iCommand'
import {IFarmRepository} from '../../interface/repositories/iFarmRepository'
import { IUnitOfWork } from '../../../../infrastructure/data/iunitofWork';

 export class DeleteFarmCommand implements ICommand{  
    public FarmId?:number;
    constructor(private readonly uow:IUnitOfWork,private readonly farmRepository:IFarmRepository){
        
    }
    public async executeAsync(): Promise<boolean> {
        if(this.FarmId === undefined) throw new Error('Id is undefined');
         this.uow.start();
         let result:boolean = await this.farmRepository.removeAsync(this.FarmId);  
         this.uow.complete();   
         return result;            
    }
 }