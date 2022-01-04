import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory, useLocation } from 'react-router';
import copy from 'clipboard-copy';
import RecommendedRecipes from '../components/RecommendedRecipes';
import { fetchRecommendedMeals } from '../services/comidasApi';

export default function DrinkById({ match }) {
  const { drinkId: id } = match.params;
  const history = useHistory();
  const location = useLocation();
  const index = 0;
  const [drink, setDrink] = useState({});
  const [recommended, setRecommended] = useState([]);
  const [alert, setAlert] = useState(false);

  const ingredients = Object.keys(drink)
    .filter((ingredient) => ingredient.includes('strIngredient'))
    .map((ingredient) => drink[ingredient]);

  const measures = Object.keys(drink)
    .filter((measure) => measure.includes('strMeasure'))
    .map((measure) => drink[measure]);

  useEffect(() => {
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

    fetchById();
    fetchByRecommendedMeal();
  }, [id]);

  function displayAlert() {
    const TWO = 3000;
    setTimeout(() => setAlert(false), TWO);
    return <span><i>Link copiado!</i></span>;
  }

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
        <button
          type="button"
          className="start-recipe"
          data-testid="start-recipe-btn"
          onClick={ () => { history.push(`/bebidas/${id}/in-progress`); } }
        >
          Iniciar Receita
        </button>
        <button
          type="button"
          onClick={ () => {
            copy(`http://localhost:3000${location.pathname}`);
            setAlert(true);
          } }
          data-testid="share-btn"
        >
          Compartilhar
        </button>
        {alert && displayAlert()}
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
