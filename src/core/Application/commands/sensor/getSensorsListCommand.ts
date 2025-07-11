import {ICommand} from '../iCommand'
import {ISensorRepository} from '../../interface/repositories/iSensorRepository'
import {SensorDTO} from '../../dTOs/sensorDTO'
import {List} from '../../../../share/utilities/list'

 export class GetSensorsListCommand implements ICommand{
    private  _sensorRepository:ISensorRepository;   
    constructor(sensorRepository:ISensorRepository){
        this._sensorRepository = sensorRepository
    }
    public executeAsync(): Promise<List<SensorDTO>> {
        return this._sensorRepository.getSensorsListAsync();             
    }
 }