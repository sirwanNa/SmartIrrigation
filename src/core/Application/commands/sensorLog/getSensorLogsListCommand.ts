import {ICommand} from '../iCommand'
import {ISensorLogRepository} from '../../interface/repositories/iSensorLogRepository'
import {SensorLogDTO} from '../../dTOs/sensorLogDTO'
import {List} from '../../../../share/utilities/list'

 export class GetSensorLogsListCommand implements ICommand{
    private  _sensorLogRepository:ISensorLogRepository;   
    constructor(sensorLogRepository:ISensorLogRepository){
        this._sensorLogRepository = sensorLogRepository
    }
    public executeAsync(): Promise<List<SensorLogDTO>> {
        return this._sensorLogRepository.getSensorLogsListAsync();             
    }
 }