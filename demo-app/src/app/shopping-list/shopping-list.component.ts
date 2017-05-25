import { ShoppingListService } from './shopping-list-service.module';
import { Component, OnInit } from '@angular/core';

import { Ingredient } from '../shared/ingredient.model';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
  ingredients: Ingredient[] = [];

  constructor( private _shoppingListService: ShoppingListService ) { }

  ngOnInit() {
    this.ingredients = this._shoppingListService.getAllIngredients();
  }
  
  onEditShoppingList(index: number) {
    this._shoppingListService.ingredientAddedSubject.next(index);
  }
}
