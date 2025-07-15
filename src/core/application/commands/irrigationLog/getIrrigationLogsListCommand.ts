import {ICommand} from '../iCommand'
import {IIrrigationLogRepository} from '../../interface/repositories/iIrrigationLogRepository'
import {IrrigationLogDTO} from '../../dTOs/irrigationLogDTO'
import {List} from '../../../../share/utilities/list'

 export class GetIrrigationLogsListCommand implements ICommand{
   
    constructor(private _irrigationLogRepository:IIrrigationLogRepository,public fieldId:number){
       
    }
    public executeAsync(): Promise<List<IrrigationLogDTO>> {
        return this._irrigationLogRepository.getIrrigationLogsListAsync(this.fieldId);             
    }
 }