import { Request, Response } from 'express';
import { GetFarmCommand } from '../../core/application/commands/farm/getFarmCommand';
import { GetFarmsListCommand } from '../../core/application/commands/farm/getFarmsListCommand';
import { CreateFarmCommand } from '../../core/application/commands/farm/createFarmCommand';
import { UpdateFarmCommand } from '../../core/application/commands/farm/updateFarmCommand';
import { DeleteFarmCommand } from '../../core/application/commands/farm/deleteFarmCommand';
import { IFarmRepository } from '../../core/application/interface/repositories/iFarmRepository';
import { List } from '../../share/utilities/list';
import { FarmDTO } from '../../core/application/dTOs/farmDTO';

export class FarmController {
  constructor(private readonly _farmRepository: IFarmRepository) {}

  public getFarmAsync = async (req: Request, res: Response): Promise<void> => {
    try {
      const farmId:number = parseInt(req.params.id, 10);
      if (isNaN(farmId)) {
        res.status(400).json({ message: 'Invalid farm ID' });
        return;
      }

      const command = new GetFarmCommand(this._farmRepository);
      command.FarmId = farmId;
      const result: FarmDTO = await command.executeAsync();

      if (!result) {
        res.status(404).json({ message: 'Farm not found' });
        return;
      }

      res.status(200).json(result);
    } catch (error) {
      console.error('Error in getFarm:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };

  public getFarmsListAsync = async (req: Request, res: Response): Promise<void> => {
    try {
      const command = new GetFarmsListCommand(this._farmRepository);
      const result: List<FarmDTO> = await command.executeAsync();
      res.status(200).json(result);
    } catch (error) {
      console.error('Error in getFarmsList:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };

  public createFarmAsync = async (req: Request, res: Response): Promise<void> => {
    try {
      console.log("Come here");
      const farmData: FarmDTO = req.body;
      const command = new CreateFarmCommand(this._farmRepository);
      command.farmData = farmData;
      const createdFarm: boolean = await command.executeAsync();
      res.status(201).json(createdFarm);
    } catch (error) {
      console.error('Error in creating farm:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };

  public updateFarmAsync = async (req: Request, res: Response): Promise<void> => {
    try {

      const farmData: FarmDTO = req.body;     
      const command = new UpdateFarmCommand(this._farmRepository);
      command.farmData = farmData;
      const updatedFarm: boolean = await command.executeAsync();
      res.status(200).json(updatedFarm);
    } catch (error) {
      console.error('Error in updateFarm:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };

  public deleteFarmAsync = async (req: Request, res: Response): Promise<void> => {
    try {
      const farmId:number = parseInt(req.params.id, 10);
      if (isNaN(farmId)) {
        res.status(400).json({ message: 'Invalid farm ID' });
        return;
      }
      const command = new DeleteFarmCommand(this._farmRepository);
      command.FarmId = farmId;
      const deleted:boolean = await command.executeAsync();
      res.status(204).json(deleted);
    } catch (error) {
      console.error('Error in deleteFarm:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };
}
