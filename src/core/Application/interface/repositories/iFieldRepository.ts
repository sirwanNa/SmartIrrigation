import {FieldDTO} from '../../dTOs/fieldDTO'
import {List} from '../../../../share/utilities/list'

export interface IFieldRepository{
    getFieldAsync(id:number):Promise<FieldDTO>;  
    getFieldsListAsync():Promise<List<FieldDTO>>;
    createAsync(Field:FieldDTO):Promise<boolean>;  
    updateAsync(Field:FieldDTO):Promise<boolean>;
    removeAsync(id:number):Promise<boolean>;  
}