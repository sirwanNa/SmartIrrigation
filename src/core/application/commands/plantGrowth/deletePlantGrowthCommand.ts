import {ICommand} from '../iCommand'
import {IPlantGrowthRepository} from '../../interface/repositories/iPlantGrowthRepository'

 export class DeletePlantGrowthCommand implements ICommand{
    private  _plantGrowthRepository:IPlantGrowthRepository;
    public plantGrowthId?:number;
    constructor(PlantGrowthRepository:IPlantGrowthRepository){
        this._plantGrowthRepository = PlantGrowthRepository
    }
    public executeAsync(): Promise<boolean> {
        if(this.plantGrowthId === undefined) throw new Error('Id is undefined');
        return this._plantGrowthRepository.removeAsync(this.plantGrowthId);             
    }
 }