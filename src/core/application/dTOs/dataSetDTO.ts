import { CroptType } from "../../domain/enums/cropType";
import { Month } from "../../domain/enums/month";
import { SoilType } from "../../domain/enums/soilType";
import { BaseModel } from "./baseModel";

export interface DataSetDTO extends BaseModel{
   soilType:SoilType;
   cropType:CroptType;
   landSlope:number;
   month:Month;
   temperature: number;
   estimated_Time:number;
}