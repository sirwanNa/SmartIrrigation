import { List } from "../../../../share/utilities/list";
import { DataSetDTO } from "../../dTOs/dataSetDTO";

export interface IDataSetRepository{
    getDataSetAsync():Promise<List<DataSetDTO>>;
    createAsync(dataSet:DataSetDTO):Promise<boolean>;
}