import {FarmType} from '../enums/farmType'
import {IrrigationType} from '../enums/irrigationType'
import {BaseEntity} from './baseEntity'
export interface Farm extends BaseEntity {  
  name: string;
  farmType:FarmType;
  irrigationType: IrrigationType;
}