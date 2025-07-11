import {ICommand} from '../iCommand'
import {ISensorRepository} from '../../interface/repositories/iSensorRepository'

 export class DeleteSensorCommand implements ICommand{
    private  _sensorRepository:ISensorRepository;
    public sensorId?:number;
    constructor(sensorRepository:ISensorRepository){
        this._sensorRepository = sensorRepository
    }
    public executeAsync(): Promise<boolean> {
        if(this.sensorId === undefined) throw new Error('Id is undefined');
        return this._sensorRepository.removeAsync(this.sensorId);             
    }
 }