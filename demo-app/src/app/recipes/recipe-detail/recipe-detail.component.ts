import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Params, Router } from '@angular/router';

import { Recipe } from '../recipe.model';
import { ShoppingListService } from '../../shopping-list/shopping-list-service.module';
import { RecipeService } from '../recipe-service.module';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css'],
  providers: [RecipeService]
})
export class RecipeDetailComponent implements OnInit {

  constructor( private _shoppingListService: ShoppingListService,
               private _activatedRoute: ActivatedRoute,
               private _recipeService: RecipeService,
               private router: Router ) { }

  recipe: Recipe;
  id: number;
  


  ngOnInit() {
    this._activatedRoute.params.subscribe(
       (params: Params) => {
         this.id = +params['id'];
         this.recipe = this._recipeService.getRecipeById(this.id);
       }
      )
  }

  addToShoppingList() {
    this._shoppingListService.addMoreIngredients(this.recipe.ingredients);
  }

  editRecipe() {
    this.router.navigate(['edit'], {
      relativeTo: this._activatedRoute
    });
    // this.router.navigate(['../', this.id, 'edit'], {
    //   relativeTo: this._activatedRoute
    // });
  }
}
