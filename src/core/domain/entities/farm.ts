import {FarmType} from '../enums/farmType'
import {IrrigationType} from '../enums/irrigationType'
export interface Farm {
  farmId: number;
  name: string;
  farmType:FarmType;
  irrigationType: IrrigationType;
}