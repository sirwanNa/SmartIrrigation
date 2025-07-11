import {ICommand} from '../iCommand'
import {ISensorLogRepository} from '../../interface/repositories/iSensorLogRepository'
import {SensorLogDTO} from '../../dTOs/sensorLogDTO'

 export class GetSensorLogCommand implements ICommand{
    private  _sensorLogRepository:ISensorLogRepository;
    public sensorLogId?:number;
    constructor(sensorLogRepository:ISensorLogRepository){
        this._sensorLogRepository = sensorLogRepository
    }
    public executeAsync(): Promise<SensorLogDTO> {
        if(this.sensorLogId === undefined) throw new Error('Id is undefined');
        return this._sensorLogRepository.getSensorLogAsync(this.sensorLogId);             
    }
 }
