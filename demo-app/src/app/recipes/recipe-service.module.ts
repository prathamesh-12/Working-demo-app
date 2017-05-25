import { Ingredient } from '../shared/ingredient.model';
import { Recipe } from './recipe.model';
import { Subject } from 'rxjs/Subject';

export class RecipeService {
    recipeUpdated = new Subject<Recipe[]>();

    recipes : Recipe[] = [
        new Recipe(
            'A Test Recipe 1', 
            'This is simply a test Recipe 1', 
            'https://image.freepik.com/free-icon/restaurant-cutlery-circular-symbol-of-a-spoon-and-a-fork-in-a-circle_318-61086.jpg',
            [
                new Ingredient('Jam', 1),
                new Ingredient('Butter', 2)
            ]
         ),
        new Recipe(
            'A Test Recipe 2', 
            'Just a simple test Recipe 2', 
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMLWY24GrJK1UgLKh0V9yY1EvHEEP1t3TDXsX--PnG53z3AAZGKQ',
            [
                new Ingredient("Fish", 20)
            ]
        ),
        new Recipe(
            'A Test Recipe 3', 
            'Just a simple test Recipe 3', 
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_78095DuUwQbA4tjDZNqzxRgHsA-DGMdIh52enuXF0tG6gJMLCg',
            [
                new Ingredient("Eggs", 10),
                new Ingredient("Bread", 5)
            ]
        ),
    ];

    getAllRecipes() {
        return this.recipes.slice();
    }

    getRecipeById(id: number) {
        return this.recipes[id];
    }

    addNewRecipe(recipe: Recipe) {
        this.recipes.push(recipe);
        this.recipeUpdated.next(this.recipes);
    }

    updateRecipe(idx: number, newRecipe: Recipe) {
        this.recipes[idx] = newRecipe;
        this.recipeUpdated.next(this.recipes);
    }
}