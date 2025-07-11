import { Request, Response } from 'express';
import { GetSensorCommand } from '../../core/Application/commands/sensor/getSensorCommand';
import { GetSensorsListCommand } from '../../core/Application/commands/sensor/getSensorsListCommand';
import { CreateSensorCommand } from '../../core/Application/commands/sensor/createSensorCommand';
import { UpdateSensorCommand } from '../../core/Application/commands/sensor/updateSensorCommand';
import { DeleteSensorCommand } from '../../core/Application/commands/sensor/deleteSensorCommand';
import { ISensorRepository } from '../../core/Application/interface/repositories/iSensorRepository';
import { List } from '../../share/utilities/list';
import { SensorDTO } from '../../core/Application/dTOs/sensorDTO';

export class SensorController {
  constructor(private readonly _SensorRepository: ISensorRepository) {}

  public getSensorAsync = async (req: Request, res: Response): Promise<void> => {
    try {
      const SensorId:number = parseInt(req.params.id, 10);
      if (isNaN(SensorId)) {
        res.status(400).json({ message: 'Invalid Sensor ID' });
        return;
      }

      const command = new GetSensorCommand(this._SensorRepository);
      command.sensorId = SensorId;
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
      const command = new GetSensorsListCommand(this._SensorRepository);
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
      const command = new CreateSensorCommand(this._SensorRepository);
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
      const command = new UpdateSensorCommand(this._SensorRepository);
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
      const command = new DeleteSensorCommand(this._SensorRepository);
      command.sensorId = SensorId;
      const deleted:boolean = await command.executeAsync();
      res.status(204).json(deleted);
    } catch (error) {
      console.error('Error in deleteSensor:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };
}
