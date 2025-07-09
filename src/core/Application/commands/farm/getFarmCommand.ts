
// import {ICommand,ICommandHandler} from '../ICommand'
import {ICommand} from '../ICommand'
import {IFarmRepository} from '../../interface/repositories/iFarmRepository'
import {FarmDTO} from '../../dTOs/FarmDTO'

 export class GetFarmCommand implements ICommand{
    private  _farmRepository:IFarmRepository;
    public Id?:number;
    constructor(farmRepository:IFarmRepository){
        this._farmRepository = farmRepository
    }
    public execute(): FarmDTO {
        if(this.Id === undefined) throw new Error('Id is undefined');
        return this._farmRepository.getFarm(this.Id);             
    }
 }

// export class GetFarmCommand implements ICommand {
//   constructor(public readonly id: number) {}
// }

// export class GetFarmCommandHandler implements ICommandHandler<GetFarmCommand, FarmDTO> {
//   constructor(private readonly farmRepository: IFarmRepository) {}

//   public handle(command: GetFarmCommand): FarmDTO {
//     return this.farmRepository.getFarm(command.id);
//   }
// }