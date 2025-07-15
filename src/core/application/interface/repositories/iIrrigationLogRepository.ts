import {IrrigationLogDTO} from '../../dTOs/irrigationLogDTO'
import {List} from '../../../../share/utilities/list'

export interface IIrrigationLogRepository{
    getIrrigationLogAsync(id:number):Promise<IrrigationLogDTO>;  
    getIrrigationLogsListAsync(fieldId:number):Promise<List<IrrigationLogDTO>>;
    createAsync(SensorLog:IrrigationLogDTO):Promise<boolean>;  
    // updateAsync(SensorLog:SensorLogDTO):Promise<boolean>;
    // removeAsync(id:number):Promise<boolean>;  
}