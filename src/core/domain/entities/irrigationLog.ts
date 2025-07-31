import { IrrigationType } from '../enums/irrigationType';
import {BaseEntity} from './baseEntity'
export interface IrrigationLog extends BaseEntity {
    fieldId:number;
    startDate:Date;
    irrigationType:IrrigationType;
}