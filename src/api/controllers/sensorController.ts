import { Request, Response } from 'express';
import { GetSensorCommand } from '../../core/application/commands/sensor/getSensorCommand';
import { GetSensorsListCommand } from '../../core/application/commands/sensor/getSensorsListCommand';
import { CreateSensorCommand } from '../../core/application/commands/sensor/createSensorCommand';
import { UpdateSensorCommand } from '../../core/application/commands/sensor/updateSensorCommand';
import { DeleteSensorCommand } from '../../core/application/commands/sensor/deleteSensorCommand';
import { ISensorRepository } from '../../core/application/interface/repositories/iSensorRepository';
import { List } from '../../share/utilities/list';
import { SensorDTO } from '../../core/application/dTOs/sensorDTO';
import { UnitOfWork } from '../../infrastructure/data/unitofWork';

export class SensorController {
  constructor(private readonly uow:UnitOfWork, private readonly _sensorRepository: ISensorRepository) {}

  public getSensorAsync = async (req: Request, res: Response): Promise<void> => {
    try {
      const sensorId:number = parseInt(req.params.id, 10);
      if (isNaN(sensorId)) {
        res.status(400).json({ message: 'Invalid Sensor ID' });
        return;
      }

      const command = new GetSensorCommand(this._sensorRepository);
      command.sensorId = sensorId;
      const result: SensorDTO = await command.executeAsync();

      if (!result) {
        res.status(404).json({ message: 'Sensor not found' });
        return;
      }

      res.status(200).json(result);
    } catch (error) {
      console.error('Error in getSensor:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };

  public getSensorsListAsync = async (req: Request, res: Response): Promise<void> => {
    try {
      const fieldId:number = parseInt(req.params.id, 10);
      const command = new GetSensorsListCommand(this._sensorRepository,fieldId);
      const result: List<SensorDTO> = await command.executeAsync();
      res.status(200).json(result);
    } catch (error) {
      console.error('Error in getSensorsList:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };

  public createSensorAsync = async (req: Request, res: Response): Promise<void> => {
    try {
      const SensorData: SensorDTO = req.body;
      const command = new CreateSensorCommand(this.uow,this._sensorRepository);
      command.sensorData = SensorData;
      const createdSensor: boolean = await command.executeAsync();
      res.status(201).json(createdSensor);
    } catch (error) {
      console.error('Error in creating Sensor:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };

  public updateSensorAsync = async (req: Request, res: Response): Promise<void> => {
    try {

      const SensorData: SensorDTO = req.body;     
      const command = new UpdateSensorCommand(this.uow,this._sensorRepository);
      command.sensorData = SensorData;
      const updatedSensor: boolean = await command.executeAsync();
      res.status(200).json(updatedSensor);
    } catch (error) {
      console.error('Error in updateSensor:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };

  public deleteSensorAsync = async (req: Request, res: Response): Promise<void> => {
    try {
      const SensorId:number = parseInt(req.params.id, 10);
      if (isNaN(SensorId)) {
        res.status(400).json({ message: 'Invalid Sensor ID' });
        return;
      }
      const command = new DeleteSensorCommand(this.uow,this._sensorRepository);
      command.sensorId = SensorId;
      const deleted:boolean = await command.executeAsync();
      res.status(204).json(deleted);
    } catch (error) {
      console.error('Error in deleteSensor:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };
}
