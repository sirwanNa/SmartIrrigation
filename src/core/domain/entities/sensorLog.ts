import {BaseEntity} from './baseEntity'
export interface SensorLog extends BaseEntity {
  sensorId: number;
  value: number;  
  batteryLevel?: number;
  signalStrength?: number;
}