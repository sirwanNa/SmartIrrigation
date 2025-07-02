import {SensorType} from '../enums/sensorType'
import {SensorStatus} from '../enums/sensorStatus'
export interface Sensor {
  sensorId: number;
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