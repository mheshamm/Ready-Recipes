import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Recipe } from '../recipes/recipe.model';
import { RecipeService } from '../recipes/recipe.service';
import { map , tap } from 'rxjs/operators' ;


@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor( private http : HttpClient , private recipeServ : RecipeService) { }

  saveRecipes(){
    const recipes = this.recipeServ.getRecipes();
    return this.http.put('https://recipes-51c2a-default-rtdb.firebaseio.com/recipes.json' , recipes) ;
  }
  fetchRecipes(){
    return this.http.get<Recipe[]>('https://recipes-51c2a-default-rtdb.firebaseio.com/recipes.json').pipe(map(recipe=>{
      return recipe.map( recipe =>{
        return {...recipe , ingredients : recipe.ingredients ? recipe.ingredients : []}
      }
        
      )

    }),
    tap(recipe => {
      this.recipeServ.setRecipe(recipe)

    })
    )
    
  }
}
