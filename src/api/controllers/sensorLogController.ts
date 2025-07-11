import { Request, Response } from 'express';
import { GetSensorLogCommand } from '../../core/Application/commands/sensorLog/getSensorLogCommand';
import { GetSensorLogsListCommand } from '../../core/Application/commands/sensorLog/getSensorLogsListCommand';
import { CreateSensorLogCommand } from '../../core/Application/commands/sensorLog/createSensorLogCommand';
import { ISensorLogRepository } from '../../core/Application/interface/repositories/iSensorLogRepository';
import { List } from '../../share/utilities/list';
import { SensorLogDTO } from '../../core/Application/dTOs/sensorLogDTO';

export class SensorLogController {
  constructor(private readonly _SensorLogRepository: ISensorLogRepository) {}

  public getSensorLogAsync = async (req: Request, res: Response): Promise<void> => {
    try {
      const SensorLogId:number = parseInt(req.params.id, 10);
      if (isNaN(SensorLogId)) {
        res.status(400).json({ message: 'Invalid SensorLog ID' });
        return;
      }

      const command = new GetSensorLogCommand(this._SensorLogRepository);
      command.sensorLogId = SensorLogId;
      const result: SensorLogDTO = await command.executeAsync();

      if (!result) {
        res.status(404).json({ message: 'SensorLog not found' });
        return;
      }

      res.status(200).json(result);
    } catch (error) {
      console.error('Error in getSensorLog:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };

  public getSensorLogsListAsync = async (req: Request, res: Response): Promise<void> => {
    try {
      const command = new GetSensorLogsListCommand(this._SensorLogRepository);
      const result: List<SensorLogDTO> = await command.executeAsync();
      res.status(200).json(result);
    } catch (error) {
      console.error('Error in getSensorLogsList:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };

  public createSensorLogAsync = async (req: Request, res: Response): Promise<void> => {
    try {
      const SensorLogData: SensorLogDTO = req.body;
      const command = new CreateSensorLogCommand(this._SensorLogRepository);
      command.SensorLogData = SensorLogData;
      const createdSensorLog: boolean = await command.executeAsync();
      res.status(201).json(createdSensorLog);
    } catch (error) {
      console.error('Error in creating SensorLog:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };

}
