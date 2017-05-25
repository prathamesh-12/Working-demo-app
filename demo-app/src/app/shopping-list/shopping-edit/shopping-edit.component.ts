import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list-service.module';
import { NgForm } from "@angular/forms";
import { Subscription } from 'rxjs/Rx';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {

  constructor( private _shoppingListService: ShoppingListService ) { }
  editedItemIndex : number;
  editMode = false;
  editedItem: Ingredient;
  subscription: Subscription;
  @ViewChild('addItemForm')  addItemForm: NgForm;

  onAddIngredient( ) {
    const addItemForm = this.addItemForm.value;
    const newIngredient = new Ingredient(addItemForm.name, addItemForm.amount);
    if (this.editMode) {
      this._shoppingListService.updateIngredient(this.editedItemIndex, newIngredient);
    } else {
      this._shoppingListService.addNewIngredients(newIngredient);
    }
    this.editMode = false;
  }

  onResetForm() {
    this.addItemForm.reset();
    this.editMode = false;
  }

  onDeleteItem() {
    this._shoppingListService.deleteIngredient(this.editedItemIndex);
    this.onResetForm();
  }

  ngOnInit() {
    this.subscription = this._shoppingListService.ingredientAddedSubject
          .subscribe(
            (index: number) => {
              this.editedItemIndex = index;
              this.editMode = true;
              this.editedItem = this._shoppingListService.getIngredientByIndex(this.editedItemIndex);
              this.addItemForm.setValue({
                name: this.editedItem.name,
                amount: this.editedItem.amount
              });
            }
          )
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
