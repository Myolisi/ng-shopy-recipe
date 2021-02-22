import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RecipeService } from '../services/recipe.service';
import { Recipe } from '../recipes/recipe.model';
import { map, tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class DataStorageService {
  constructor(
    private http: HttpClient,
    private recipesService: RecipeService
  ) {}

  save() {
    const recipes = this.recipesService.getReripes();

    // override data in DB with new recipe items
    this.http
      .put(
        'https://ng-shopy-recipe-default-rtdb.firebaseio.com/recipes.json',
        recipes
      )
      .subscribe((res) => {
        console.log(res);
        alert('Data added');
      });
  }

  fetch() {
    return this.http
      .get<Recipe[]>(
        'https://ng-shopy-recipe-default-rtdb.firebaseio.com/recipes.json'
      )
      .pipe(
        map((data: any) => {
          return data.map((item: Recipe) => {
            // check if the returned object has ingredients value else assign empty array to ingredients
            return {
              ...item,
              ingredients: item.ingredients ? item.ingredients : [],
            };
          });
        }),
        // we will use tap to assign the returned data
        // will allow us subscribe to this observer in the resolver
        tap((res) => {
          this.recipesService.setRecipes(res);
          console.log(this.recipesService.getReripes());
        })
      );
  }
}
