import { EventEmitter, Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Recipe } from '../recipes/recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  recipeSelected = new EventEmitter<Recipe>();
  recipeChanged = new Subject<Recipe[]>();

  constructor(private shoppingListService: ShoppingListService) { }
  recipes: Recipe[] = [
    new Recipe('Chicken Gatsby', 'A very testy Chicken Burger with Chips', 'https://images.unsplash.com/photo-1457460866886-40ef8d4b42a0?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      [
        new Ingredient('Meat: Chicken', 1),
        new Ingredient('Plain Roll', 1),
        new Ingredient('Onion', 2),
        new Ingredient('Tomatoes', 2),
        new Ingredient('Potatoes', 5)
      ]
    ),

    new Recipe('Beef Buger', 'Fantastic, greasy beef burger', 'https://images.unsplash.com/photo-1495753379358-73c76ccd644b?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1410&q=80', [
      new Ingredient('Tomatoes', 5),
      new Ingredient('Onion', 2),
      new Ingredient('Burger Roll', 1),
      new Ingredient('Beef Paty', 2),
    ])
  ];

  getReripes() {
    // slice to return the new array, else will return original array
    return this.recipes.slice();
  }

  getRecipe(id: number) {
    return this.recipes[id];
  }

  addToShoppingList(ingredients: Ingredient[]) {
    this.shoppingListService.addIngredients(ingredients);
  }

  add(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipeChanged.next(this.recipes.slice());
   }

  update(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipeChanged.next(this.recipes.slice());
  }

  delete(index: number) {
    this.recipes.splice(index, 1);
    this.recipeChanged.next(this.recipes.slice());
  }
}
