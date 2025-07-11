import {SensorType} from '../enums/sensorType'
import {SensorStatus} from '../enums/sensorStatus'
import {BaseEntity} from './baseEntity'
export interface Sensor extends BaseEntity { 
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