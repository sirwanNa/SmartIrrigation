import {SensorDTO} from '../../dTOs/sensorDTO'
import {List} from '../../../../share/utilities/list'

export interface ISensorRepository{
    getSensorAsync(id:number):Promise<SensorDTO>;  
    getSensorsListAsync(fieldId:number):Promise<List<SensorDTO>>;
    createAsync(Sensor:SensorDTO):Promise<boolean>;  
    updateAsync(Sensor:SensorDTO):Promise<boolean>;
    removeAsync(id:number):Promise<boolean>;  
}