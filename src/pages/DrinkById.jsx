import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import RecommendedRecipes from '../components/RecommendedRecipes';
import { fetchRecommendedMeals } from '../services/comidasApi';

export default function DrinkById({ match }) {
  const { drinkId: id } = match.params;
  const index = 0;
  const [drink, setDrink] = useState({});
  const [recommended, setRecommended] = useState([]);

  const ingredients = Object.keys(drink)
    .filter((ingredient) => ingredient.includes('strIngredient'))
    .map((ingredient) => drink[ingredient]);

  const measures = Object.keys(drink)
    .filter((measure) => measure.includes('strMeasure'))
    .map((measure) => drink[measure]);

  const fetchById = async () => {
    try {
      const res = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
      const json = await res.json();
      const drinkRecipe = json.drinks[0];
      setDrink(drinkRecipe);
      return drinkRecipe;
    } catch (error) {
      console.log('ERRO DE REQUISIÇÃO', error);
    }
  };

  async function fetchByRecommendedMeal() {
    const recommendation = await fetchRecommendedMeals();
    setRecommended(recommendation);
  }

  useEffect(() => {
    fetchById();
    fetchByRecommendedMeal();
  }, []);

  return (
    <div>
      <div>
        <h2 data-testid="recipe-category">{drink.strCategory}</h2>
        <h2 data-testid="recipe-category">{drink.strAlcoholic}</h2>
        <h2 data-testid="recipe-title">{drink.strDrink}</h2>
        <img
          data-testid="recipe-photo"
          alt={ drink.strDrink }
          src={ drink.strDrinkThumb }
        />
        {ingredients.map((ingredient, i) => (
          <li
            key={ `${ingredient}-${i}` }
            data-testid={ `${i}-ingredient-name-and-measure` }
          >
            {`${ingredient} - ${measures[i]}`}
          </li>))}
        <div data-testid="instructions">{drink.strInstructions}</div>
        <button type="button" data-testid="start-recipe-btn">Iniciar Receita</button>
        <button type="button" data-testid="share-btn">Compartilhar</button>
        <button type="button" data-testid="favorite-btn">Favoritar</button>
        <RecommendedRecipes index={ index } recommended={ recommended } type="drink" />
      </div>
    </div>
  );
}

DrinkById.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      drinkId: PropTypes.string,
    }),
  }).isRequired,
};
