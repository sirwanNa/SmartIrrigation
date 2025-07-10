import {ICommand} from '../iCommand'
import {IFieldRepository} from '../../interface/repositories/iFieldRepository'
import {FieldDTO} from '../../dTOs/fieldDTO'
import {List} from '../../../../share/utilities/list'

 export class GetFieldsListCommand implements ICommand{
    private  _fieldRepository:IFieldRepository;   
    constructor(fieldRepository:IFieldRepository){
        this._fieldRepository = fieldRepository
    }
    public executeAsync(): Promise<List<FieldDTO>> {
        return this._fieldRepository.getFieldsListAsync();             
    }
 }