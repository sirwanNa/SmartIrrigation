import {ICommand} from '../iCommand'
import {IPlantGrowthRepository} from '../../interface/repositories/iPlantGrowthRepository'
import { IUnitOfWork } from '../../../../infrastructure/data/iunitofWork';

 export class DeletePlantGrowthCommand implements ICommand {   
    public plantGrowthId?:number;
    constructor(private readonly uow:IUnitOfWork,private readonly plantGrowthRepository:IPlantGrowthRepository){
        
    }
    public async executeAsync(): Promise<boolean> {
        if(this.plantGrowthId === undefined) throw new Error('Id is undefined');
         this.uow.start();
         let result:boolean = await this.plantGrowthRepository.removeAsync(this.plantGrowthId);    
         this.uow.complete();   
         return result;          
    }
 }