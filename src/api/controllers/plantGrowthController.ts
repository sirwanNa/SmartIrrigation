import { Request, Response } from 'express';
import { GetPlantGrowthCommand } from '../../core/application/commands/plantGrowth/getPlantGrowthCommand';
import { GetPlantGrowthListCommand } from '../../core/application/commands/plantGrowth/getPlantGrowthListCommand';
import { CreatePlantGrowthCommand } from '../../core/application/commands/plantGrowth/createPlantGrowthCommand';
import { UpdatePlantGrowthCommand } from '../../core/application/commands/plantGrowth/updatePlantGrowthCommand';
import { DeletePlantGrowthCommand } from '../../core/application/commands/plantGrowth/deletePlantGrowthCommand';
import { IPlantGrowthRepository } from '../../core/application/interface/repositories/iPlantGrowthRepository';
import { List } from '../../share/utilities/list';
import { PlantGrowthDTO } from '../../core/application/dTOs/plantGrowthDTO';

export class PlantGrowthController {
  constructor(private readonly _PlantGrowthRepository: IPlantGrowthRepository) {}

  public getPlantGrowthAsync = async (req: Request, res: Response): Promise<void> => {
    try {
      const id:number = parseInt(req.params.id, 10);
      if (isNaN(id)) {
        res.status(400).json({ message: 'Invalid PlantGrowth ID' });
        return;
      }

      const command = new GetPlantGrowthCommand(this._PlantGrowthRepository);
      command.id = id;
      const result: PlantGrowthDTO = await command.executeAsync();

      if (!result) {
        res.status(404).json({ message: 'PlantGrowth not found' });
        return;
      }

      res.status(200).json(result);
    } catch (error) {
      console.error('Error in getPlantGrowth:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };

  public getPlantGrowthsListAsync = async (req: Request, res: Response): Promise<void> => {
    try {
      const fieldId:number = parseInt(req.params.id, 10);
      const command = new GetPlantGrowthListCommand(this._PlantGrowthRepository,fieldId);
      const result: List<PlantGrowthDTO> = await command.executeAsync();
      res.status(200).json(result);
    } catch (error) {
      console.error('Error in getPlantGrowthsList:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };

  public createPlantGrowthAsync = async (req: Request, res: Response): Promise<void> => {
    try {
      const PlantGrowthData: PlantGrowthDTO = req.body;
      const command = new CreatePlantGrowthCommand(this._PlantGrowthRepository);
      command.plantGrowthData = PlantGrowthData;
      const createdPlantGrowth: boolean = await command.executeAsync();
      res.status(201).json(createdPlantGrowth);
    } catch (error) {
      console.error('Error in creating PlantGrowth:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };

  public updatePlantGrowthAsync = async (req: Request, res: Response): Promise<void> => {
    try {

      const PlantGrowthData: PlantGrowthDTO = req.body;     
      const command = new UpdatePlantGrowthCommand(this._PlantGrowthRepository);
      command.plantGrowthData = PlantGrowthData;
      const updatedPlantGrowth: boolean = await command.executeAsync();
      res.status(200).json(updatedPlantGrowth);
    } catch (error) {
      console.error('Error in updatePlantGrowth:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };

  public deletePlantGrowthAsync = async (req: Request, res: Response): Promise<void> => {
    try {
      const PlantGrowthId:number = parseInt(req.params.id, 10);
      if (isNaN(PlantGrowthId)) {
        res.status(400).json({ message: 'Invalid PlantGrowth ID' });
        return;
      }
      const command = new DeletePlantGrowthCommand(this._PlantGrowthRepository);
      command.plantGrowthId = PlantGrowthId;
      const deleted:boolean = await command.executeAsync();
      res.status(204).json(deleted);
    } catch (error) {
      console.error('Error in deletePlantGrowth:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };
}
