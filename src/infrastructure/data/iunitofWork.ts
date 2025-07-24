import { ClientSession } from "mongodb";

export interface IUnitOfWork{
    start():Promise<void>;
    complete():Promise<void>;
    rollback():Promise<void>;
    getSession():ClientSession | undefined;

}