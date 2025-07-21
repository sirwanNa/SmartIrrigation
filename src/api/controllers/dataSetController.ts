import { Request, Response } from 'express';
import { GetDataSetCommand } from "../../core/application/commands/dataSet/getDataSetCommand";
import { DataSetDTO } from "../../core/application/dTOs/dataSetDTO";
import { IDataSetRepository } from "../../core/application/interface/repositories/iDataSetRepository";
import { List } from "../../share/utilities/list";
import { CreateDataSetCommand } from '../../core/application/commands/dataSet/createDataSetCommand';


export class DataSetController{
    constructor(private readonly _dataSetRepository:IDataSetRepository){

    }

    public getDataSetAsync = async (req: Request, res: Response): Promise<void> => {
        try {
            const command = new GetDataSetCommand(this._dataSetRepository);
            const result: List<DataSetDTO> = await command.executeAsync();
            res.status(200).json(result);
        } catch (error) {
            console.error('Error in GetDataSet:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    };

    public insertAsync = async (req: Request, res: Response): Promise<void> => {
        try {      
            const farmData: DataSetDTO = req.body;
            const command = new CreateDataSetCommand(this._dataSetRepository);
            command.dataSetData = farmData;
            const createdFarm: boolean = await command.executeAsync();
            res.status(201).json(createdFarm);
        } catch (error) {
            console.error('Error in inserting to dataset:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    };
}