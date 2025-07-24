import { Request, Response } from 'express';
import { GetSensorLogCommand } from '../../core/application/commands/sensorLog/getSensorLogCommand';
import { GetSensorLogsListCommand } from '../../core/application/commands/sensorLog/getSensorLogsListCommand';
import { CreateSensorLogCommand } from '../../core/application/commands/sensorLog/createSensorLogCommand';
import { ISensorLogRepository } from '../../core/application/interface/repositories/iSensorLogRepository';
import { List } from '../../share/utilities/list';
import { SensorLogDTO } from '../../core/application/dTOs/sensorLogDTO';
import { ISensorRepository } from '../../core/application/interface/repositories/iSensorRepository';
import { IIrrigationLogRepository } from '../../core/application/interface/repositories/iIrrigationLogRepository';
import { IFieldRepository } from '../../core/application/interface/repositories/iFieldRepository';
import { IDataSetRepository } from '../../core/application/interface/repositories/iDataSetRepository';
import { IUnitOfWork } from '../../infrastructure/data/iunitofWork';

export class SensorLogController {
  constructor(private readonly uow:IUnitOfWork, private readonly _sensorLogRepository: ISensorLogRepository,
    private readonly _sensorRepository:ISensorRepository,
    private readonly _irrigationLogRepository:IIrrigationLogRepository,
    private readonly fieldRepository:IFieldRepository,
    private readonly dataSetRepository:IDataSetRepository
  ) {}

  public getSensorLogAsync = async (req: Request, res: Response): Promise<void> => {
    try {
      const sensorLogId:number = parseInt(req.params.id, 10);
      if (isNaN(sensorLogId)) {
        res.status(400).json({ message: 'Invalid SensorLog ID' });
        return;
      }

      const command = new GetSensorLogCommand(this._sensorLogRepository);
      command.sensorLogId = sensorLogId;
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
      const sensorId:number = parseInt(req.params.id, 10);
      const command = new GetSensorLogsListCommand(this._sensorLogRepository,sensorId);
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
      const command = new CreateSensorLogCommand(this.uow,this._sensorLogRepository,this._sensorRepository,
        this._irrigationLogRepository,this.fieldRepository,this.dataSetRepository);
      command.sensorLogData = SensorLogData;
      const createdSensorLog: boolean = await command.executeAsync();
      res.status(201).json(createdSensorLog);
    } catch (error) {
      console.error('Error in creating SensorLog:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };

}
