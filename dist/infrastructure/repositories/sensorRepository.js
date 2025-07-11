"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SensorRepository = void 0;
const list_1 = require("../../share/utilities/list");
class SensorRepository {
    constructor() {
        this.Sensors = [];
    }
    async getSensorAsync(id) {
        const Sensor = this.Sensors.find(f => f.id === id);
        if (!Sensor) {
            throw new Error(`Sensor with ID ${id} not found`);
        }
        return Sensor;
    }
    async getSensorsListAsync() {
        const list = new list_1.List();
        return list;
    }
    async createAsync(Sensor) {
        const exists = this.Sensors.some(f => f.id === Sensor.id);
        if (exists)
            return false;
        this.Sensors.push(Sensor);
        return true;
    }
    async updateAsync(Sensor) {
        const index = this.Sensors.findIndex(f => f.id === Sensor.id);
        if (index === -1)
            return false;
        this.Sensors[index] = Sensor;
        return true;
    }
    async removeAsync(id) {
        const index = this.Sensors.findIndex(f => f.id === id);
        if (index === -1)
            return false;
        this.Sensors.splice(index, 1);
        return true;
    }
}
exports.SensorRepository = SensorRepository;
