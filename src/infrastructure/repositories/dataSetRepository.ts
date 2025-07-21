import { DataSetDTO } from "../../core/application/dTOs/dataSetDTO";
import { IDataSetRepository } from "../../core/application/interface/repositories/iDataSetRepository";
import { DataSet } from "../../core/domain/entities/dataset";
import { List } from "../../share/utilities/list";
import { UnitOfWork } from "../data/unitofWork";
import { BaseRepository } from "./baseRepository";


export class DataSetRepository extends BaseRepository<DataSet> implements IDataSetRepository {
    constructor(uow: UnitOfWork) {
    super(uow, 'dataSet');
    }

     private fromDTO(dto: DataSetDTO): DataSet {
          const { id,createdDate, soilType, cropType,landSlope,month,temperature,estimated_Time } = dto;
          return { id,createdDate, soilType, cropType,landSlope,month,temperature,estimated_Time };
     }
     public async getDataSetAsync():Promise<List<DataSetDTO>> {
          const entities = await this.getAll();
          const list = new List<DataSetDTO>(entities);    
          return list;
     }

     public async createAsync(dataSet:DataSetDTO):Promise<boolean>{
          const existing = await this.getById(dataSet.id);
          if (existing) return false;
          const entity = this.fromDTO(dataSet);
          return await this.create(entity);
     }
}