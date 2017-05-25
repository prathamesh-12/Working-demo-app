import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { RecipeService } from '../recipe-service.module';

import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css'],
  providers: [RecipeService]
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[] = [];

  constructor( private _recipeService: RecipeService,
               private _router: Router,
               private _activatedRoute: ActivatedRoute ) {  }

  @Output() recipeSelect = new EventEmitter<Recipe>();

  onRecipeSelect(recipe: Recipe) {
    this.recipeSelect.emit(recipe);
  }

  ngOnInit() {
    this._recipeService.recipeUpdated
      .subscribe(
        (recipesArray: Recipe[]) => {
          this.recipes = recipesArray;
        }
      )
    this.recipes = this._recipeService.getAllRecipes();
  }

  onNewRecipeAdded() {
    this._router.navigate(['new'], {
      relativeTo: this._activatedRoute
    });
  }

}
