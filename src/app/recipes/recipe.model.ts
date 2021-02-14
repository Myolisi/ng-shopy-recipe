import { Ingredient } from '../shared/ingredient.model';

export class Recipe{
  // short hand
  name: string; description: string; imagePath: string;
  ingredients: Ingredient[];

  constructor( name: string,  description: string,  imagePath: string, ingredients: Ingredient[])
  {
    this.name = name;
    this.description = description;
    this.imagePath = imagePath;
    this.ingredients = ingredients;
  }
}
