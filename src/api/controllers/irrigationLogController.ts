import { Request, Response } from 'express';
import { GetIrrigationLogCommand } from '../../core/application/commands/irrigationLog/getIrrigationLogCommand';
import { GetIrrigationLogsListCommand } from '../../core/application/commands/irrigationLog/getIrrigationLogsListCommand';
import { CreateIrrigationLogCommand } from '../../core/application/commands/irrigationLog/createIrrigationLogCommand';
import { IIrrigationLogRepository } from '../../core/application/interface/repositories/iIrrigationLogRepository';
import { List } from '../../share/utilities/list';
import { IrrigationLogDTO } from '../../core/application/dTOs/irrigationLogDTO';

export class IrrigationLogController {
  constructor(private readonly _IrrigationLogRepository: IIrrigationLogRepository) {}

  public getIrrigationLogAsync = async (req: Request, res: Response): Promise<void> => {
    try {
      const id:number = parseInt(req.params.id, 10);
      if (isNaN(id)) {
        res.status(400).json({ message: 'Invalid IrrigationLog ID' });
        return;
      }

      const command = new GetIrrigationLogCommand(this._IrrigationLogRepository);
      command.id = id;
      const result: IrrigationLogDTO = await command.executeAsync();

      if (!result) {
        res.status(404).json({ message: 'IrrigationLog not found' });
        return;
      }

      res.status(200).json(result);
    } catch (error) {
      console.error('Error in getIrrigationLog:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };

  public getIrrigationLogsListAsync = async (req: Request, res: Response): Promise<void> => {
    try {
      const IrrigationId:number = parseInt(req.params.id, 10);
      const command = new GetIrrigationLogsListCommand(this._IrrigationLogRepository,IrrigationId);
      const result: List<IrrigationLogDTO> = await command.executeAsync();
      res.status(200).json(result);
    } catch (error) {
      console.error('Error in getIrrigationLogsList:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };

  public createIrrigationLogAsync = async (req: Request, res: Response): Promise<void> => {
    try {
      const irrigationLogData: IrrigationLogDTO = req.body;
      const command = new CreateIrrigationLogCommand(this._IrrigationLogRepository);
      command.irrigationLogData = irrigationLogData;
      const createdIrrigationLog: boolean = await command.executeAsync();
      res.status(201).json(createdIrrigationLog);
    } catch (error) {
      console.error('Error in creating IrrigationLog:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };

}
