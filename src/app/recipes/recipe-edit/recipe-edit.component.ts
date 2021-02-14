import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RecipeService } from 'src/app/services/recipe.service';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  id: number;
  isEdit = false;
  recipeForm: FormGroup;
  editedRecipe: Recipe;
  constructor(private route: ActivatedRoute, private  recipeService: RecipeService, private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = Number(params.id);
      this.isEdit = params.id != null; // see if we are in edit mode
      if (this.isEdit) { this.editedRecipe = this.recipeService.getRecipe(this.id); }
      this.formInit();

    });
  }

  private formInit() {
    let recipeName;
    let recipeImagePath;
    let recipeDescription;
    const recipeIngredients = new FormArray([]);

    if (this.isEdit) {
      recipeName = this.editedRecipe['name'];
      recipeDescription = this.editedRecipe['description'];
      recipeImagePath = this.editedRecipe['imagePath'];

      if (this.editedRecipe['ingredients']) {
        for (const ingredient of this.editedRecipe['ingredients']) {
          recipeIngredients.push(
            new FormGroup({
              'name': new FormControl(ingredient['name'], Validators.required),
              'amount': new FormControl(ingredient['amount'], [Validators.required, Validators.pattern(/^[0-9]/)])
            })
          );
        }
      }
    }
    this.recipeForm = new FormGroup({
      'name': new FormControl(recipeName, Validators.required),
      'imagePath' : new FormControl(recipeImagePath, Validators.required),
      'description': new FormControl(recipeDescription, Validators.required),
      'ingredients': recipeIngredients
    });
  }

  onSubmit() {
    const recipe =  new Recipe(
        this.recipeForm.value['name'],
        this.recipeForm.value['description'], this.recipeForm.value['imagePath'],
        this.recipeForm.value['ingredients']
      );
    if (this.isEdit) {
      this.recipeService.update(this.id, recipe );
    } else {
      // * this.recipeFrom.value has the same values matching our Recipe object
      this.recipeService.add(this.recipeForm.value);
    }
    this.router.navigate(['../'], {relativeTo: this.route} );
  }

  getControls() {
    return (this.recipeForm.get('ingredients') as FormArray).controls;
  }

  onDeleteIngredient(index: number) {
    (this.recipeForm.get('ingredients') as FormArray).removeAt(index);
  }

  onAddIngredient() {
    (this.recipeForm.get('ingredients') as FormArray).push(
      new FormGroup({
        'name': new FormControl(null, Validators.required),
        'amount': new FormControl(null, [Validators.required, Validators.pattern(/^[0-9]/)])
      })
    );
  }

  onCancel() {
    // {relativeTo: this.route} -> current route we are on
    // since we are using relative path
    this.router.navigate(['../'], {relativeTo: this.route} );
  }
}
