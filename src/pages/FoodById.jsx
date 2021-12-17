import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import RecommendedRecipes from '../components/RecommendedRecipes';
import { fetchRecommendedDrinks } from '../services/bebidasApi';
import '../styles/recommended.css';

export default function FoodById({ match }) {
  const { foodId: id } = match.params;
  const index = 0;
  const [meal, setMeal] = useState({});
  const [recommended, setRecommended] = useState([]);

  const ingredients = Object.keys(meal)
    .filter((ingredient) => ingredient.includes('strIngredient'))
    .map((ingredient) => meal[ingredient]);

  const measures = Object.keys(meal)
    .filter((measure) => measure.includes('strMeasure'))
    .map((measure) => meal[measure]);

  const fetchById = async () => {
    try {
      const res = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
      const json = await res.json();
      const mealRecipe = json.meals[0];
      setMeal(mealRecipe);
      return mealRecipe;
    } catch (error) {
      console.log('error', error);
    }
  };

  async function fetchByRedomendedDrink() {
    const recommendation = await fetchRecommendedDrinks();
    setRecommended(recommendation);
  }

  useEffect(() => {
    fetchById();
    fetchByRedomendedDrink();
  });

  return (
    <div className="page-container">
      <div>
        <h2 data-testid="recipe-category">{meal.strCategory}</h2>
        <h2 data-testid="recipe-title">{meal.strMeal}</h2>
        <img
          data-testid="recipe-photo"
          alt={ meal.strMeal }
          src={ meal.strMealThumb }
          width="200"
        />
        {ingredients.map((ingredient, i) => (
          <li
            key={ `${ingredient}-${i}` }
            data-testid={ `${i}-ingredient-name-and-measure` }
          >
            {`${ingredient} - ${measures[i]}`}
          </li>))}
        <div data-testid="instructions">{meal.strInstructions}</div>
        <h3>Vídeo</h3>
        <iframe
          width="340"
          height="200"
          title={ meal.strMeal }
          src={ meal.strYoutube }
          data-testid="video"
        />
        <button type="button" data-testid="start-recipe-btn">Iniciar Receita</button>
        <button type="button" data-testid="share-btn">Compartilhar</button>
        <button type="button" data-testid="favorite-btn">Favoritar</button>
        <div className="recommended-container">
          <RecommendedRecipes
            index={ index }
            recommended={ recommended }
            type="meal"
          />
        </div>
      </div>
    </div>
  );
}

FoodById.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      foodId: PropTypes.string,
    }),
  }).isRequired,
};
