import {FarmType} from '../../domain/enums/farmType'
import {BaseModel} from './baseModel'
export interface FarmDTO extends BaseModel {
  name: string;
  farmType:FarmType; 
}