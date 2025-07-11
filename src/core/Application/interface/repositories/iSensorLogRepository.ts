import {SensorLogDTO} from '../../dTOs/sensorLogDTO'
import {List} from '../../../../share/utilities/list'

export interface ISensorLogRepository{
    getSensorLogAsync(id:number):Promise<SensorLogDTO>;  
    getSensorLogsListAsync():Promise<List<SensorLogDTO>>;
    createAsync(SensorLog:SensorLogDTO):Promise<boolean>;  
    // updateAsync(SensorLog:SensorLogDTO):Promise<boolean>;
    // removeAsync(id:number):Promise<boolean>;  
}