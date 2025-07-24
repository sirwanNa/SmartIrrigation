import {ICommand} from '../iCommand'
import {ISensorRepository} from '../../interface/repositories/iSensorRepository'
import { IUnitOfWork } from '../../../../infrastructure/data/iunitofWork';

 export class DeleteSensorCommand implements ICommand{    
    public sensorId?:number;
    constructor(private readonly uow:IUnitOfWork,private readonly sensorRepository:ISensorRepository){
        
    }
    public async executeAsync(): Promise<boolean> {
        if(this.sensorId === undefined) throw new Error('Id is undefined');
        this.uow.start();
        let result:boolean = await this.sensorRepository.removeAsync(this.sensorId);  
        this.uow.complete();   
        return result;        
    }
 }