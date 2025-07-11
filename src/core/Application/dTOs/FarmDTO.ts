import {FarmType} from '../../domain/enums/farmType'
import {IrrigationType} from '../../domain/enums/irrigationType'
import {BaseModel} from './baseModel'
export interface FarmDTO extends BaseModel {
  name: string;
  farmType:FarmType;
  irrigationType: IrrigationType;
}