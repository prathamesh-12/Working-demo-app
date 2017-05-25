import { Subject } from 'rxjs/Rx';
import { Ingredient } from '../shared/ingredient.model';

export class ShoppingListService {
    ingredientAddedSubject = new Subject();
    ingredients: Ingredient[] = [
        new Ingredient('Apples', 5),
        new Ingredient('Tomatoes', 12),
    ];

    getAllIngredients() {
        return this.ingredients;
    }

    getIngredientByIndex(idx: number) {
        return this.ingredients[idx];
    }

    addNewIngredients(ingredient: Ingredient) {
        this.ingredients.push(ingredient);
    }

    addMoreIngredients(ingredients: Ingredient[]) {
        for (let ingred of ingredients) {
            this.addNewIngredients(ingred);
        }
    }

    updateIngredient(idx: number, newIngredient: Ingredient) {
        this.ingredients[idx] = newIngredient;
        console.log(this.ingredients);
    }

    deleteIngredient(idx: number) {
        this.ingredients.splice(idx, 1);
    }
}