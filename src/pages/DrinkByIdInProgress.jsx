import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router';
import copy from 'clipboard-copy';
import '../styles/recommended.css';

function handleFavoriteButtonClick(id, drink, favorite, setFavorite) {
  const recipe = {
    id,
    type: 'bebida',
    area: '',
    category: drink.strCategory,
    alcoholicOrNot: drink.strAlcoholic,
    name: drink.strDrink,
    image: drink.strDrinkThumb };

  if (!JSON.parse(localStorage.getItem('favoriteRecipes'))
    || JSON.parse(localStorage.getItem('favoriteRecipes')) === 0) {
    localStorage.setItem('favoriteRecipes', JSON.stringify([recipe]));
  } else {
    const favoriteFoods = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const alreadyFavorite = favoriteFoods.some(
      (favoriteRecipe) => favoriteRecipe.id === id,
    );
    if (alreadyFavorite) {
      const newFavorites = favoriteFoods.filter(
        (favoriteRecipe) => favoriteRecipe.id !== id,
      );
      localStorage.setItem('favoriteRecipes', JSON.stringify(newFavorites));
    } else {
      favoriteFoods.push(recipe);
      localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteFoods));
    }
  }
  if (favorite === true) {
    return setFavorite(false);
  }
  setFavorite(true);
}
export default function DrinkByIdInProgress({ match }) {
  const { drinkId: id } = match.params;
  const location = useLocation();
  const [drink, setDrink] = useState({});
  const [alert, setAlert] = useState(false);
  const [favorite, setFavorite] = useState(false);
  console.log(drink);

  useEffect(() => {
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (favoriteRecipes !== null && favoriteRecipes.some((recipe) => recipe.id === id)) {
      setFavorite(true);
    }
  }, [id]);

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

    fetchById();
  }, [id]);

  function displayAlert() {
    const THREE = 3000;
    setTimeout(() => setAlert(false), THREE);
    return <span><i>Link copiado!</i></span>;
  }

  return (
    <div className="page-container">
      <div>
        <h2 data-testid="recipe-category">{drink.strAlcoholic}</h2>
        <h2 data-testid="recipe-title">{drink.strDrink}</h2>
        <img
          data-testid="recipe-photo"
          alt={ drink.strDrink }
          src={ drink.strDrinkThumb }
          width="200"
        />
        {ingredients.map((ingredient, i) => (
          (ingredient === '' || ingredient === null)
            ? null
            : (
              <li
                key={ `${ingredient}-${i}` }
                data-testid={ `${i}-ingredient-step` }
              >
                {`${ingredient} - ${measures[i]}`}
              </li>
            )
        ))}
        <div data-testid="instructions">{drink.strInstructions}</div>
        <input
          type="image"
          onClick={ () => {
            copy(`http://localhost:3000${location.pathname}`);
            setAlert(true);
          } }
          alt="share-content"
          data-testid="share-btn"
          src="/images/shareIcon.svg"
        />
        {alert && displayAlert()}
        <input
          type="image"
          data-testid="favorite-btn"
          onClick={ () => handleFavoriteButtonClick(id, drink, favorite, setFavorite) }
          alt="heart"
          src={
            favorite ? '/images/blackHeartIcon.svg' : '/images/whiteHeartIcon.svg'
          }
        />
        <button type="button" data-testid="finish-recipe-btn">Finalizar Receita</button>
      </div>
    </div>
  );
}

DrinkByIdInProgress.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      drinkId: PropTypes.string,
    }),
  }).isRequired,
};
