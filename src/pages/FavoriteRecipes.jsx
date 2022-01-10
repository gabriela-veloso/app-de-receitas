import React from 'react';
import Header from '../components/Header';

export default function FavoriteRecipes() {
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
          type="image"
          src="/images/shareIcon.svg"
          alt="share-icon"
        />
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
          src="/images/shareIcon.svg"
          alt="share-icon"
        />
        <input
          data-testid={ `${index}-horizontal-favorite-btn` }
          type="image"
          src="/images/blackHeartIcon.svg"
          alt="favorite-icon"
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
