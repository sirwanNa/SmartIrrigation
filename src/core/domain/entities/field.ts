import {CroptType} from '../enums/cropType'
import {SoilType} from '../enums/soilType'
export interface Field {
  fieldId: number;
  name: string;
  cropType: CroptType;
  soilType: SoilType;
  areaSize: number; // in hectares
  latitude: number;
  longitude: number;
  FarmId?: number;
  CultivationDate:Date;
}
