import {CroptType} from '../enums/cropType'
import {SoilType} from '../enums/soilType'
import {BaseEntity} from './baseEntity'
export interface Field extends BaseEntity {
  name: string;
  cropType: CroptType;
  soilType: SoilType;
  areaSize: number; // in hectares
  latitude: number;
  longitude: number;
  FarmId?: number;
  CultivationDate:Date;
}
