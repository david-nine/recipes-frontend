import {IngredientDTO} from './ingredient-dto';

export interface RecipeDTO {

  id: number;
  name: string;
  description: string;
  howToMake: string;
  cookTime: number;
  photoUrl: string;
  revenue?: number;
  ingredients: IngredientDTO[];
}
