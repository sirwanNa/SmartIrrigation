
import {CroptType} from '../../domain/enums/cropType'
import {SoilType} from '../../domain/enums/soilType'
import {BaseModel} from './baseModel'

export interface FieldDTO extends BaseModel {
  name: string;
  cropType: CroptType;
  soilType: SoilType;
  areaSize: number; // in hectares
  latitude: number;
  longitude: number;
  FarmId?: number;
  CultivationDate:Date;
}
