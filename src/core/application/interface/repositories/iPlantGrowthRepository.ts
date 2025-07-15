import {PlantGrowthDTO} from '../../dTOs/plantGrowthDTO'
import {List} from '../../../../share/utilities/list'

export interface IPlantGrowthRepository{
    getPlantGrowthAsync(id:number):Promise<PlantGrowthDTO>;  
    getPlantGrowthListAsync(fieldId:number):Promise<List<PlantGrowthDTO>>;
    createAsync(plantGrowth:PlantGrowthDTO):Promise<boolean>;  
    updateAsync(plantGrowth:PlantGrowthDTO):Promise<boolean>;
    removeAsync(id:number):Promise<boolean>;  
}