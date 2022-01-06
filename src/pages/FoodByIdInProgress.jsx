import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import copy from 'clipboard-copy';
import '../styles/recommended.css';

function handleFavoriteButtonClick(id, meal, favorite, setFavorite) {
  const recipe = {
    id,
    type: 'comida',
    area: meal.strArea,
    category: meal.strCategory,
    alcoholicOrNot: '',
    name: meal.strMeal,
    image: meal.strMealThumb };

  if (!JSON.parse(localStorage.getItem('favoriteRecipes'))
    || JSON.parse(localStorage.getItem('favoriteRecipes')) === 0) {
    localStorage.setItem('favoriteRecipes', JSON.stringify([recipe]));
  } else {
    const favoriteFoods = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const alreadyFavorite = favoriteFoods.some(
      (favoriteRecipe) => favoriteRecipe.id === meal.idMeal,
    );
    if (alreadyFavorite) {
      const newFavorites = favoriteFoods.filter(
        (favoriteRecipe) => favoriteRecipe.id !== meal.idMeal,
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

function validateButton(setIsDisable) {
  const checkboxInputs = Array.from(document.querySelectorAll('.ingredient-step'));
  const check = checkboxInputs.every((input) => input.checked === true);
  setIsDisable(!check);
}

function saveProcess(ingredientId, recipeId) {
  const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));

  if (!inProgressRecipes) {
    const newProgressRecipes = {
      meals: {
        [recipeId]: [ingredientId],
      },
    };

    localStorage.setItem('inProgressRecipes', JSON.stringify(newProgressRecipes));
  } else if (!inProgressRecipes.meals) {
    const newProgressRecipes = {
      ...inProgressRecipes,
      meals: {
        [recipeId]: [ingredientId],
      },
    };

    localStorage.setItem('inProgressRecipes', JSON.stringify(newProgressRecipes));
  } else if (!inProgressRecipes.meals[recipeId]) {
    const newProgressRecipes = {
      ...inProgressRecipes,
      meals: {
        ...inProgressRecipes.meals,
        [recipeId]: [ingredientId],
      },
    };

    localStorage.setItem('inProgressRecipes', JSON.stringify(newProgressRecipes));
  } else { // aqui <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
    const recipeIngredients = inProgressRecipes.meals[recipeId];
    console.log(recipeIngredients);
    const checkIngredients = recipeIngredients
      .some((ingredient) => ingredient === ingredientId);
    console.log(checkIngredients);
  }
}

function checkIngredient({ target }, setIsDisable, index, id) {
  if (target.checked) {
    target.parentNode.style = 'text-decoration: line-through';
  } else {
    target.parentNode.style = 'text-decoration: none';
  }
  validateButton(setIsDisable);
  saveProcess(index, id);
}

export default function FoodByIdInProgress({ match }) {
  const { foodId: id } = match.params;
  const [meal, setMeal] = useState({});
  const [alert, setAlert] = useState(false);
  const [favorite, setFavorite] = useState(false);
  const [isDisable, setIsDisable] = useState(true);

  useEffect(() => {
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (favoriteRecipes !== null && favoriteRecipes.some((recipe) => recipe.id === id)) {
      setFavorite(true);
    }
  }, [id]);

  const ingredients = Object.keys(meal)
    .filter((ingredient) => ingredient.includes('strIngredient'))
    .map((ingredient) => meal[ingredient]);

  const measures = Object.keys(meal)
    .filter((measure) => measure.includes('strMeasure'))
    .map((measure) => meal[measure]);

  useEffect(() => {
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
        <h2 data-testid="recipe-category">{meal.strCategory}</h2>
        <h2 data-testid="recipe-title">{meal.strMeal}</h2>
        <img
          data-testid="recipe-photo"
          alt={ meal.strMeal }
          src={ meal.strMealThumb }
          width="200"
        />
        <div className="ingredient-list">
          {ingredients.map((ingredient, i) => (
            (ingredient === '' || ingredient === null)
              ? null
              : (
                <div className="ingredient-container" key={ `${ingredient}-${i}` }>
                  <label
                    htmlFor={ ingredient }
                    data-testid={ `${i}-ingredient-step` }
                  >
                    <input
                      onClick={ (event) => checkIngredient(event, setIsDisable, i, id) }
                      id={ ingredient }
                      type="checkbox"
                      className="ingredient-step"
                    />
                    {
                      (measures[i] === '' || !measures[i])
                        ? ingredient
                        : `${ingredient} - ${measures[i]}`
                    }
                  </label>
                </div>
              )
          ))}
        </div>
        <div data-testid="instructions">{meal.strInstructions}</div>
        <input
          type="image"
          onClick={ () => {
            copy(`http://localhost:3000/comidas/${id}`);
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
          onClick={ () => handleFavoriteButtonClick(id, meal, favorite, setFavorite) }
          alt="heart"
          src={
            favorite ? '/images/blackHeartIcon.svg' : '/images/whiteHeartIcon.svg'
          }
        />
        <button
          type="button"
          data-testid="finish-recipe-btn"
          disabled={ isDisable }
        >
          Finalizar Receita
        </button>
      </div>
    </div>
  );
}

FoodByIdInProgress.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      foodId: PropTypes.string,
    }),
  }).isRequired,
};
