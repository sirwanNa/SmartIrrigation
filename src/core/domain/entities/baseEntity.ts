import {BaseEntity_MongoDb} from './baseEntity_MongoDb'
export interface BaseEntity extends BaseEntity_MongoDb{
    Id:number;
    CreatedDate:Date;
}