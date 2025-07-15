import {ICommand} from '../iCommand'
import {IFieldRepository} from '../../interface/repositories/iFieldRepository'
import {FieldDTO} from '../../dTOs/fieldDTO'

 export class GetFieldCommand implements ICommand{
    private  _fieldRepository:IFieldRepository;
    public fieldId?:number;
    constructor(fieldRepository:IFieldRepository){
        this._fieldRepository = fieldRepository
    }
    public executeAsync(): Promise<FieldDTO> {
        if(this.fieldId === undefined) throw new Error('Id is undefined');
        return this._fieldRepository.getFieldAsync(this.fieldId);             
    }
 }
