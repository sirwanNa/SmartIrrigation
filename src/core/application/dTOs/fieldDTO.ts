
import {CroptType} from '../../domain/enums/cropType'
import { IrrigationMethod } from '../../domain/enums/irrigationMethod';
import {SoilType} from '../../domain/enums/soilType'
import {BaseModel} from './baseModel'

export interface FieldDTO extends BaseModel {
  name: string;
  cropType: CroptType;
  soilType: SoilType;
  areaSize: number; // in hectares
  latitude: number;
  longitude: number;
  farmId?: number;
  cultivationDate:Date;
  landSlope:number;
  irrigationMethod: IrrigationMethod;
}
