export interface SensorLogDTO {
  sensorLogId:number;
  readingId: number;
  sensorId: number;
  value: number;
  timestamp: Date;
  batteryLevel?: number;
  signalStrength?: number;
}