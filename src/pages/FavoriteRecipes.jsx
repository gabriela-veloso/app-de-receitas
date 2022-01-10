import React, { useState } from 'react';
import copy from 'clipboard-copy';
import Header from '../components/Header';

export default function FavoriteRecipes() {
  const [alert, setAlert] = useState(false);
  function displayAlert() {
    const THREE = 3000;
    setTimeout(() => setAlert(false), THREE);
    return <span><i>Link copiado!</i></span>;
  }

  function renderFavMeals(recipe, index) {
    return (
      <div key={ recipe.id }>
        <img
          data-testid={ `${index}-horizontal-image` }
          src={ recipe.image }
          alt={ recipe.name }
        />
        <h4 data-testid={ `${index}-horizontal-name` }>{ recipe.name }</h4>
        <input
          data-testid={ `${index}-horizontal-share-btn` }
          onClick={ () => {
            copy(`http://localhost:3000/comidas/${recipe.id}`);
            setAlert(true);
          } }
          type="image"
          src="/images/shareIcon.svg"
          alt="share-icon"
        />
        {alert && displayAlert()}
        <input
          data-testid={ `${index}-horizontal-favorite-btn` }
          type="image"
          src="/images/blackHeartIcon.svg"
          alt="favorite-icon"
        />
        <p
          data-testid={ `${index}-horizontal-top-text` }
        >
          { `${recipe.area} - ${recipe.category}` }
        </p>
      </div>
    );
  }

  function renderFavDrinks(recipe, index) {
    return (
      <div key={ recipe.id }>
        <img
          data-testid={ `${index}-horizontal-image` }
          src={ recipe.image }
          alt={ recipe.name }
        />
        <p data-testid={ `${index}-horizontal-top-text` }>{ recipe.alcoholicOrNot }</p>
        <h4 data-testid={ `${index}-horizontal-name` }>{ recipe.name }</h4>
        <input
          data-testid={ `${index}-horizontal-share-btn` }
          type="image"
          onClick={ () => {
            copy(`http://localhost:3000/bebidas/${recipe.id}`);
            setAlert(true);
          } }
          src="/images/shareIcon.svg"
          alt="share-icon"
        />
        {alert && displayAlert()}
        <input
          data-testid={ `${index}-horizontal-favorite-btn` }
          type="image"
          src="/images/blackHeartIcon.svg"
          alt="favorite-icon"
          // onClick={() => {

          // }}
        />
      </div>
    );
  }

  function renderFavoriteRecipes() {
    const arrayFavoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    return (
      <div>
        <button type="button" data-testid="filter-by-all-btn">All</button>
        <button type="button" data-testid="filter-by-food-btn">Food</button>
        <button type="button" data-testid="filter-by-drink-btn">Drinks</button>
        {arrayFavoriteRecipes.map((recipe, index) => {
          if (recipe.type === 'comida') { return renderFavMeals(recipe, index); }
          return renderFavDrinks(recipe, index);
        })}
      </div>
    );
  }

  return (
    <div>
      <Header title="Receitas Favoritas" showSearchIcon={ false } />
      <div>
        { (!JSON.parse(localStorage.getItem('favoriteRecipes'))
        || JSON.parse(localStorage.getItem('favoriteRecipes')).length === 0)
          ? global.alert('Você não favoritou nenhuma receita') : renderFavoriteRecipes() }
      </div>
    </div>
  );
}

// data-testid="filter-by-all-btn"
