export interface SensorLog {
  readingId: number;
  sensorId: number;
  value: number;
  timestamp: Date;
  batteryLevel?: number;
  signalStrength?: number;
}