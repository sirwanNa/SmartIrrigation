import { CroptType } from "../enums/cropType";
import { Month } from "../enums/month";
import { SoilType } from "../enums/soilType";
import { BaseEntity } from "./baseEntity";

export interface DataSet extends BaseEntity{
   soilType:SoilType;
   cropType:CroptType;
   landSlope:number;
   month:Month;
   temperature: number;
   estimated_Time:number;

}