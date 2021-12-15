import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import RecommendedRecipes from '../components/RecommendedRecipes';

export default function FoodById({ match }) {
  const { foodId: id } = match.params;
  const index = 0;
  const [meal, setMeal] = useState({});

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
      console.log(json.meals);
      const mealRecipe = json.meals[0];
      setMeal(mealRecipe);
      return mealRecipe;
    } catch (error) {
      console.log('error', error);
    }
  };

  useEffect(() => {
    fetchById();
  }, []);

  console.log(meal);

  return (
    <div>
      <div>
        <h2 data-testid="recipe-category">{meal.strCategory}</h2>
        <h2 data-testid="recipe-title">{meal.strMeal}</h2>
        <img
          data-testid="recipe-photo"
          alt={ meal.strMeal }
          width="50"
          src={ meal.strMealThumb }
        />
        {ingredients.map((ingredient, i) => (
          <li
            key={ `${ingredient}` }
            data-testid={ `${i}-ingredient-name-and-measure` }
          >
            {`${ingredient} - ${measures[i]}`}
          </li>))}
        <div data-testid="instructions">{meal.strInstructions}</div>
        <h3>Vídeo</h3>
        <iframe
          width="360"
          height="200"
          title="receita"
          src={ meal.length > 0 ? meal.strYoutube.replace('watch?v=', 'embed/') : '' }
          data-testid="video"
        />
        <button type="button" data-testid="start-recipe-btn">Iniciar Receita</button>
        <button type="button" data-testid="share-btn">Compartilhar</button>
        <button type="button" data-testid="favorite-btn">Favoritar</button>
        <RecommendedRecipes index={ index } />
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
