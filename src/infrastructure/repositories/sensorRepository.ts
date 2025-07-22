import { ISensorRepository } from '../../core/application/interface/repositories/iSensorRepository';
import { SensorDTO } from '../../core/application/dTOs/sensorDTO';
import { List } from '../../share/utilities/list';
import { BaseRepository } from './baseRepository';
import { UnitOfWork } from '../data/unitofWork';
import { Sensor } from '../../core/domain/entities/sensor';
import { Mapper } from '../../share/utilities/mapper';

export class SensorRepository extends BaseRepository<Sensor> implements ISensorRepository {

  constructor(uow: UnitOfWork) {
    super(uow, 'sensors');
  }  


  public async getSensorAsync(id: number): Promise<SensorDTO> {
    const entity = await this.getById(id);
    if (!entity) throw new Error(`Sensor with ID ${id} not found`);   
     return Mapper.Map<Sensor,SensorDTO>(entity);
  }

  public async getSensorsListAsync(): Promise<List<SensorDTO>> {    
    const entities = await this.getAll();
    const list = new List<SensorDTO>(entities);    
    return list;
  }

  public async createAsync(sensor: SensorDTO): Promise<boolean> {
    const existing = await this.getById(sensor.id);
    if (existing) return false;  
    const entity = Mapper.Map<SensorDTO,Sensor>(sensor)
    return await this.create(entity);
  }

  public async updateAsync(sensor: SensorDTO): Promise<boolean> {
    await this.checkObjectIsExist(sensor.id);    
    const entity = Mapper.Map<SensorDTO,Sensor>(sensor)
    return await this.update(entity);
  }

  public async removeAsync(id: number): Promise<boolean> {
     await this.checkObjectIsExist(id);
     return await this.delete(id);
  }
}
