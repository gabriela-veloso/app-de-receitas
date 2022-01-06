import React, { useState } from 'react';
import Header from '../components/Header';

export default function FavoriteRecipes() {
  const [meal, setMeal] = useState({});
  const fetchById = async (id) => {
    try {
      const res = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
      const json = await res.json();
      const mealRecipe = json.meals[0];
      setMeal(mealRecipe);
    } catch (error) {
      console.log('error', error);
    }
  };

  function recipesMap() {
    const arrayFavoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    arrayFavoriteRecipes.map((recipe, index) => {
      fetchById(recipe.id);
      const ingredients = Object.keys(meal)
        .filter((ingredient) => ingredient.includes('strIngredient'))
        .map((ingredient) => meal[ingredient]);
      // const liMap = meal.map((meal, index).map(ingredients) => {
      //   // ingredient === '' || ingredient === null)
      //   // ? null : 
      //   // <li data-testid={ `${index}-ingredient-step` }>{meal.ingredient}</li>
      // });
      return (
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
            src="/images/shareIcon.svg"
            alt="favorite-icon"
          />
          <p data-testid="recipe-category">{ recipe.category }</p>
          {/* {liMap} */}
          <button
            type="submit"
            data-testid="finish-recipe-btn"
          >
            Finalizar Receita
          </button>
        </div>
      );
    });
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
