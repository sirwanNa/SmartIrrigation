import {BaseModel} from './baseModel'
export interface SensorLogDTO extends BaseModel {
  sensorId: number;
  value: number;
  batteryLevel?: number;
  signalStrength?: number;
}