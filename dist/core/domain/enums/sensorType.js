"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SensorType = void 0;
var SensorType;
(function (SensorType) {
    // 🌱 Soil-related Sensors
    SensorType["SoilMoisture"] = "SoilMoisture";
    SensorType["SoilTemperature"] = "SoilTemperature";
    SensorType["SoilPH"] = "SoilPH";
    SensorType["SoilSalinity"] = "SoilSalinity";
    SensorType["SoilNutrient"] = "SoilNutrient";
    // 🌤️ Weather/Environmental Sensors
    SensorType["AirTemperature"] = "AirTemperature";
    SensorType["Humidity"] = "Humidity";
    SensorType["RainGauge"] = "RainGauge";
    SensorType["WindSpeed"] = "WindSpeed";
    SensorType["WindDirection"] = "WindDirection";
    SensorType["LightIntensity"] = "LightIntensity";
    // 💧 Water Management
    SensorType["WaterFlow"] = "WaterFlow";
    SensorType["WaterLevel"] = "WaterLevel";
    SensorType["Pressure"] = "Pressure";
    // ⚡ Power & Signal
    SensorType["BatteryLevel"] = "BatteryLevel";
    SensorType["SignalStrength"] = "SignalStrength";
    // 📦 Miscellaneous
    SensorType["CO2"] = "CO2";
    SensorType["Ammonia"] = "Ammonia";
    SensorType["Methane"] = "Methane";
    SensorType["Motion"] = "Motion";
    SensorType["Custom"] = "Custom";
})(SensorType || (exports.SensorType = SensorType = {}));
