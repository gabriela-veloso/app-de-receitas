import React, { useEffect, useState } from 'react';
import Header from '../components/Header';

export default function FavoriteRecipes() {
  const [meals, setMeals] = useState([]);
  const recipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
  const recipesId = recipes.map((recipe) => recipe.id);
  useEffect(() => {
    const arrayRecipes = [];
    const fetchById = async (id) => {
      try {
        const res = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
        const json = await res.json();
        const mealRecipe = json.meals[0];
        arrayRecipes.push(mealRecipe);
      } catch (error) {
        console.log('error', error);
      }
    };
    recipesId.forEach((id) => fetchById(id));
    setMeals(arrayRecipes);
  }, [recipes.id]);

  // O texto da categoria deve possuir o atributo data-testid="recipe-category";
  // Os ingredientes devem possuir o atributo data-testid=${index}-ingredient-step, a verificação será feita pelo length do atributo.
  // O elemento de instruções deve possuir o atributo data-testid="instructions";
  // O botão para finalizar a receita deve possuir o atributo data-testid="finish-recipe-btn".

  console.log([{a: "b"}, {}, {}]);
  function ingredientsListMap() {
    return (<div>teste</div>);
  }

  function recipesMap() {
    const arrayFavoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    return arrayFavoriteRecipes.map((recipe) => (
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
        { (meals.length > 0) && ingredientsListMap() }
        <button
          type="submit"
          data-testid="finish-recipe-btn"
        >
          Finalizar Receita
        </button>
      </div>
    ));
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
