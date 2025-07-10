import {ICommand} from '../iCommand'
import {IFieldRepository} from '../../interface/repositories/iFieldRepository'

 export class DeleteFieldCommand implements ICommand{
    private  _fieldRepository:IFieldRepository;
    public fieldId?:number;
    constructor(fieldRepository:IFieldRepository){
        this._fieldRepository = fieldRepository
    }
    public executeAsync(): Promise<boolean> {
        if(this.fieldId === undefined) throw new Error('Id is undefined');
        return this._fieldRepository.removeAsync(this.fieldId);             
    }
 }