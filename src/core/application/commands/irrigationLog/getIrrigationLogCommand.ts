import {ICommand} from '../iCommand'
import {IIrrigationLogRepository} from '../../interface/repositories/iIrrigationLogRepository'
import {IrrigationLogDTO} from '../../dTOs/irrigationLogDTO'

 export class GetIrrigationLogCommand implements ICommand{
    private  _irrigationLogRepository:IIrrigationLogRepository;
    public id?:number;
    constructor(irrigationLogRepository:IIrrigationLogRepository){
        this._irrigationLogRepository = irrigationLogRepository
    }
    public executeAsync(): Promise<IrrigationLogDTO> {
        if(this.id === undefined) throw new Error('Id is undefined');
        return this._irrigationLogRepository.getIrrigationLogAsync(this.id);             
    }
 }
