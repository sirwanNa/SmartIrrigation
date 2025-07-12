import {ICommand} from '../iCommand'
import {IPlantGrowthRepository} from '../../interface/repositories/iPlantGrowthRepository'
import {PlantGrowthDTO} from '../../dTOs/plantGrowthDTO'

 export class GetPlantGrowthCommand implements ICommand{
    private  _plantGrowthRepository:IPlantGrowthRepository;
    public id?:number;
    constructor(plantGrowthRepository:IPlantGrowthRepository){
        this._plantGrowthRepository = plantGrowthRepository
    }
    public executeAsync(): Promise<PlantGrowthDTO> {
        if(this.id === undefined) throw new Error('Id is undefined');
        return this._plantGrowthRepository.getPlantGrowthAsync(this.id);             
    }
 }
