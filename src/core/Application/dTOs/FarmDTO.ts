import {FarmType} from '../../domain/enums/farmType'
import {IrrigationType} from '../../domain/enums/irrigationType'
export interface FarmDTO {
  farmId: number;
  name: string;
  farmType:FarmType;
  irrigationType: IrrigationType;
}