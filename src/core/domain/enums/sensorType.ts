export enum SensorType {
  // 🌱 Soil-related Sensors
  SoilMoisture = "SoilMoisture",
  SoilTemperature = "SoilTemperature",
  SoilPH = "SoilPH",
  SoilSalinity = "SoilSalinity",
  SoilNutrient = "SoilNutrient",      // NPK sensor

  // 🌤️ Weather/Environmental Sensors
  AirTemperature = "AirTemperature",
  Humidity = "Humidity",
  RainGauge = "RainGauge",
  WindSpeed = "WindSpeed",
  WindDirection = "WindDirection",
  LightIntensity = "LightIntensity",  // PAR or sunlight

  // 💧 Water Management
  WaterFlow = "WaterFlow",
  WaterLevel = "WaterLevel",
  Pressure = "Pressure",

}
