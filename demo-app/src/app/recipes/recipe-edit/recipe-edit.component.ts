import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Params } from '@angular/router';
import { FormGroup, FormControl, Validators,FormArray } from '@angular/forms';
import { RecipeService } from '../recipe-service.module';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css'],
  providers: [RecipeService]
})
export class RecipeEditComponent implements OnInit {

  id: number;
  editMode: boolean = false;
  recipeForm: FormGroup;
  recipe: Recipe;
  
  constructor( private _activatedRoute: ActivatedRoute,
               private _recipeService: RecipeService ) { }

  ngOnInit() {
    this._activatedRoute.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id'];
          this.editMode = params['id'] != null;
          this.initForm();
        }
      )    
  }

  initForm() {
    let recipeName, recipeImagePath, recipeDescription = null;
    let recipeIngredients = new FormArray([]);

    if (this.editMode) {
      this.recipe = this._recipeService.getRecipeById(this.id);
      recipeName = this.recipe.name;
      recipeImagePath = this.recipe.imagePath;
      recipeDescription = this.recipe.description;

      if (this.recipe.hasOwnProperty('ingredients')) {
        for (let ingredient of this.recipe.ingredients) {
          recipeIngredients.push(
            new FormGroup({
              'name': new FormControl(ingredient.name, Validators.required),
              'amount': new FormControl(ingredient.amount, [
                Validators.required, 
                Validators.pattern(/^[1-9]+[0-9]*$/)
              ])
            })
          )
        }
      }
    }

    this.recipeForm = new FormGroup({
      "name" : new FormControl(recipeName, Validators.required),
      "description": new FormControl(recipeDescription, Validators.required),
      "imagePath": new FormControl(recipeImagePath, Validators.required),
      "ingredients": recipeIngredients
    });
  }

    submitRecipeForm() {
      debugger;
      if (this.editMode) {
        this._recipeService.updateRecipe(this.id, this.recipeForm.value);
      } else {
        this._recipeService.addNewRecipe(this.recipeForm.value);
      }
    }

    addIngredint() {
      (<FormArray>this.recipeForm.get('ingredients')).push(
        new FormGroup({
          'name': new FormControl(null, Validators.required),
          'amount':new FormControl(null, [
            Validators.required,
            Validators.pattern(/^[1-9]+[0-9]*$/)
          ])
        })
      )
    }

}
