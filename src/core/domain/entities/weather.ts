export interface WeatherReading {
  weatherId: number;
  fieldId: number;
  airTemp: number;
  humidity: number;
  rainfall: number;
  sunlight: number;
  timestamp: Date;
}