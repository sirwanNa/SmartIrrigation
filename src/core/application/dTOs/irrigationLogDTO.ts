import {BaseModel} from './baseModel'
export interface IrrigationLogDTO extends BaseModel {
    fieldId:number;
    startDate:Date;
    endDate?:Date;
}