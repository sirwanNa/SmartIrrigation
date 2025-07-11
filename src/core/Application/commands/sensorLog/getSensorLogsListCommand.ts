import {ICommand} from '../iCommand'
import {ISensorLogRepository} from '../../interface/repositories/iSensorLogRepository'
import {SensorLogDTO} from '../../dTOs/sensorLogDTO'
import {List} from '../../../../share/utilities/list'

 export class GetSensorLogsListCommand implements ICommand{
   
    constructor(private _sensorLogRepository:ISensorLogRepository,public sensorId:number){
       
    }
    public executeAsync(): Promise<List<SensorLogDTO>> {
        return this._sensorLogRepository.getSensorLogsListAsync(this.sensorId);             
    }
 }