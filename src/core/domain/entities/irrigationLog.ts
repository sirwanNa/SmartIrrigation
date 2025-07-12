import {BaseEntity} from './baseEntity'
export interface IrrigationLog extends BaseEntity {
    fieldId:number;
    startDate:Date;
    endDate?:Date;
}