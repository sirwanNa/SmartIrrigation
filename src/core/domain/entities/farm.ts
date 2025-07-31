import {FarmType} from '../enums/farmType'
import {BaseEntity} from './baseEntity'
export interface Farm extends BaseEntity {  
  name: string;
  farmType:FarmType; 
}