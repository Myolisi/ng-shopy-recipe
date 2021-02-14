import { EventEmitter, Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {
  ingredientsChanged = new Subject<Ingredient[]>();
  startedEditing = new Subject<number>();
ingredient: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 2)
];

  constructor() { }

  get(index?: number) {
    if (index !== undefined) {
      return this.ingredient[index];
    }
    else {
      // slice to return the new array, else will return original array
    return this.ingredient.slice();
    }
  }

  add(ingredient: Ingredient) {
    this.ingredient.push(ingredient);
    this.ingredientsChanged.next(this.ingredient.slice());
  }

  addIngredients(ingredients: Ingredient[]) {
    this.ingredient.push(...ingredients);
    this.ingredientsChanged.next(this.ingredient.slice());
  }

  update(index: number, edited: Ingredient) {
    this.ingredient[index] = edited;
    this.ingredientsChanged.next(this.ingredient.slice());
  }

  delete(index: number) {
    this.ingredient.splice(index, 1);
    this.ingredientsChanged.next(this.ingredient.slice());
  }

}
