import {ICommand} from '../iCommand'
import {ISensorRepository} from '../../interface/repositories/iSensorRepository'
import {SensorDTO} from '../../dTOs/sensorDTO'
import {List} from '../../../../share/utilities/list'

 export class GetSensorsListCommand implements ICommand{    
    constructor(private sensorRepository:ISensorRepository,private fieldId:number){       
    }
    public executeAsync(): Promise<List<SensorDTO>> {
        return this.sensorRepository.getSensorsListAsync(this.fieldId);             
    }
 }