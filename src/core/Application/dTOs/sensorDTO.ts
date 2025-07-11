import {SensorType} from '../../domain/enums/sensorType'
import {SensorStatus} from '../../domain/enums/sensorStatus'
export interface SensorDTO {
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