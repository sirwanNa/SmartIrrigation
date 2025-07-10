
import {CroptType} from '../../domain/enums/cropType'
import {SoilType} from '../../domain/enums/soilType'
export interface FieldDTO {
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
