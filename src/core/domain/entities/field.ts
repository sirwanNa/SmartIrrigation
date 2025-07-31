import {CroptType} from '../enums/cropType'
import { IrrigationMethod } from '../enums/irrigationMethod';
import {SoilType} from '../enums/soilType'
import {BaseEntity} from './baseEntity'
export interface Field extends BaseEntity {
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
