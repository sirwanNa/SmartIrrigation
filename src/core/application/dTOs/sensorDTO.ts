import {SensorType} from '../../domain/enums/sensorType'
import {SensorStatus} from '../../domain/enums/sensorStatus'
import {BaseModel} from './baseModel'
export interface SensorDTO extends BaseModel { 
  name: string;
  sensorType: SensorType;
  fieldId: number;
  depthCm: number;
  latitude: number;
  longitude: number;
  unit: string;
  installationDate: Date;
  status: SensorStatus;
}