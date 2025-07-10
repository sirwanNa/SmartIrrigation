import { Request, Response } from 'express';
import { GetFieldCommand } from '../../core/Application/commands/field/getFieldCommand';
import { GetFieldsListCommand } from '../../core/Application/commands/field/getFieldsListCommand';
import { CreateFieldCommand } from '../../core/Application/commands/field/createFieldCommand';
import { UpdateFieldCommand } from '../../core/Application/commands/field/updateFieldCommand';
import { DeleteFieldCommand } from '../../core/Application/commands/field/deleteFieldCommand';
import { IFieldRepository } from '../../core/Application/interface/repositories/iFieldRepository';
import { List } from '../../share/utilities/list';
import { FieldDTO } from '../../core/Application/dTOs/fieldDTO';

export class FieldController {
  constructor(private readonly _FieldRepository: IFieldRepository) {}

  public getFieldAsync = async (req: Request, res: Response): Promise<void> => {
    try {
      const FieldId:number = parseInt(req.params.id, 10);
      if (isNaN(FieldId)) {
        res.status(400).json({ message: 'Invalid Field ID' });
        return;
      }

      const command = new GetFieldCommand(this._FieldRepository);
      command.fieldId = FieldId;
      const result: FieldDTO = await command.executeAsync();

      if (!result) {
        res.status(404).json({ message: 'Field not found' });
        return;
      }

      res.status(200).json(result);
    } catch (error) {
      console.error('Error in getField:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };

  public getFieldsListAsync = async (req: Request, res: Response): Promise<void> => {
    try {
      const command = new GetFieldsListCommand(this._FieldRepository);
      const result: List<FieldDTO> = await command.executeAsync();
      res.status(200).json(result);
    } catch (error) {
      console.error('Error in getFieldsList:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };

  public createFieldAsync = async (req: Request, res: Response): Promise<void> => {
    try {
      const FieldData: FieldDTO = req.body;
      const command = new CreateFieldCommand(this._FieldRepository);
      command.fieldData = FieldData;
      const createdField: boolean = await command.executeAsync();
      res.status(201).json(createdField);
    } catch (error) {
      console.error('Error in creating Field:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };

  public updateFieldAsync = async (req: Request, res: Response): Promise<void> => {
    try {

      const FieldData: FieldDTO = req.body;     
      const command = new UpdateFieldCommand(this._FieldRepository);
      command.fieldData = FieldData;
      const updatedField: boolean = await command.executeAsync();
      res.status(200).json(updatedField);
    } catch (error) {
      console.error('Error in updateField:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };

  public deleteFieldAsync = async (req: Request, res: Response): Promise<void> => {
    try {
      const FieldId:number = parseInt(req.params.id, 10);
      if (isNaN(FieldId)) {
        res.status(400).json({ message: 'Invalid Field ID' });
        return;
      }
      const command = new DeleteFieldCommand(this._FieldRepository);
      command.fieldId = FieldId;
      const deleted:boolean = await command.executeAsync();
      res.status(204).json(deleted);
    } catch (error) {
      console.error('Error in deleteField:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };
}
