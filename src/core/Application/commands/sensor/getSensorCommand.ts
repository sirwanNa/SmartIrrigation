import {ICommand} from '../iCommand'
import {ISensorRepository} from '../../interface/repositories/iSensorRepository'
import {SensorDTO} from '../../dTOs/sensorDTO'

 export class GetSensorCommand implements ICommand{
    private  _sensorRepository:ISensorRepository;
    public sensorId?:number;
    constructor(sensorRepository:ISensorRepository){
        this._sensorRepository = sensorRepository
    }
    public executeAsync(): Promise<SensorDTO> {
        if(this.sensorId === undefined) throw new Error('Id is undefined');
        return this._sensorRepository.getSensorAsync(this.sensorId);             
    }
 }
