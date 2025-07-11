import { ISensorRepository } from '../../core/Application/interface/repositories/iSensorRepository';
import { SensorDTO } from '../../core/Application/dTOs/sensorDTO';
import { List } from '../../share/utilities/list';

export class SensorRepository implements ISensorRepository {
  private Sensors: SensorDTO[] = [];

  public async getSensorAsync(id: number): Promise<SensorDTO> {
    const Sensor = this.Sensors.find(f => f.sensorId === id);
    if (!Sensor) {
      throw new Error(`Sensor with ID ${id} not found`);
    }
    return Sensor;
  }

  public async getSensorsListAsync(): Promise<List<SensorDTO>> {
    const list = new List<SensorDTO>();    
    return list;
  }

  public async createAsync(Sensor: SensorDTO): Promise<boolean> {
    const exists = this.Sensors.some(f => f.sensorId === Sensor.sensorId);
    if (exists) return false;

    this.Sensors.push(Sensor);
    return true;
  }

  public async updateAsync(Sensor: SensorDTO): Promise<boolean> {
    const index = this.Sensors.findIndex(f => f.sensorId === Sensor.sensorId);
    if (index === -1) return false;

    this.Sensors[index] = Sensor;
    return true;
  }

  public async removeAsync(id: number): Promise<boolean> {
    const index = this.Sensors.findIndex(f => f.sensorId === id);
    if (index === -1) return false;

    this.Sensors.splice(index, 1);
    return true;
  }
}
