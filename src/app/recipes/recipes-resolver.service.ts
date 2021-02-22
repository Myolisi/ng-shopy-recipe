import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { RecipeService } from '../services/recipe.service';
import { DataStorageService } from '../shared/data-storage.service';
import { Recipe } from './recipe.model';

@Injectable({ providedIn: 'root' })
export class RecipesResolverService implements Resolve<Recipe[]> {
  constructor(
    private storage: DataStorageService,
    private recipeService: RecipeService
  ) {}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const recipes = this.recipeService.getReripes();
    // before loading new data we want to make sure that there are no recipes loaded
    if (!recipes.length) {
      // the resolver willl subscribe for us when looking for data
      return this.storage.fetch();
    } else {
      // return loaded recipes no need to fetch
      return recipes;
    }
  }
}
