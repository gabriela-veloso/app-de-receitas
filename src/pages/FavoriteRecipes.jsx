import React, { useEffect, useState } from 'react';
import Header from '../components/Header';

export default function FavoriteRecipes() {
  const [meals, setMeals] = useState([]);
  const [isMealsFull, setisMealsFull] = useState(false);
  const recipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
  const recipesId = recipes.map((recipe) => recipe.id);

  useEffect(() => {
    const recipesFav = [];
    const fetchById = async (id) => {
      try {
        const res = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
        const json = await res.json();
        const mealRecipe = json.meals[0];
        recipesFav.push(mealRecipe);
      } catch (error) {
        console.log('error', error);
      }
    };

    console.log(recipesFav.length);
    setMeals(recipesFav);
    recipesId.forEach((id) => fetchById(id));
    setisMealsFull(true);
  }, []);
  function ingredientsListMap() {
    console.log(meals.length);
    // meals.map((meal) => console.log(meal));
    return meals.map((recipe) => (
      <div key={ recipe.idMeal }>{ recipe.strIngredient1 }</div>
    ));
  }

  function recipesMap() {
    const arrayFavoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (!isMealsFull) {
      return null;
    }
    return (
      arrayFavoriteRecipes.map((recipe) => (
        <div key={ recipe.id }>
          <img
            data-testid="recipe-photo"
            src={ recipe.image }
            alt={ recipe.name }
          />
          <h4 data-testid="recipe-title">{ recipe.name }</h4>
          <input
            data-testid="share-btn"
            type="image"
            src="/images/shareIcon.svg"
            alt="share-icon"
          />
          <input
            data-testid="favorite-btn"
            type="image"
            src="/images/blackHeartIcon.svg"
            alt="favorite-icon"
          />
          <p data-testid="recipe-category">{ recipe.category }</p>
          { ingredientsListMap() }
          <button
            type="submit"
            data-testid="finish-recipe-btn"
          >
            Finalizar Receita
          </button>
        </div>
      )));
  }

  return (
    <div>
      <Header title="Receitas Favoritas" showSearchIcon={ false } />
      <div>
        { (!JSON.parse(localStorage.getItem('favoriteRecipes'))
        || JSON.parse(localStorage.getItem('favoriteRecipes')).length === 0)
          ? global.alert('Você não favoritou nenhuma receita') : recipesMap() }
      </div>
    </div>
  );
}
