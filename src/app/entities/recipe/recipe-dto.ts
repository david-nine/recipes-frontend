import {IngredientDTO} from './ingredient-dto';

export interface RecipeDTO {

  id: number;
  name: string;
  description: string;
  howToMake: string;
  cookTIme: number;
  photoUrl: string;
  revenue: string;
  ingredients: IngredientDTO[];
}
