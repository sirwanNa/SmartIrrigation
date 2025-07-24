import {ICommand} from '../iCommand'
import {IFieldRepository} from '../../interface/repositories/iFieldRepository'
import { IUnitOfWork } from '../../../../infrastructure/data/iunitofWork';

 export class DeleteFieldCommand implements ICommand{ 
    public fieldId?:number;
    constructor(private readonly uow:IUnitOfWork,private fieldRepository:IFieldRepository){
       
    }
    public async executeAsync(): Promise<boolean> {
        if(this.fieldId === undefined) throw new Error('Id is undefined');
        this.uow.start();
        let result:boolean = await this.fieldRepository.removeAsync(this.fieldId); 
        this.uow.complete();   
        return result;             
    }
 }