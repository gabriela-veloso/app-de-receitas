import React from 'react';
import PropTypes from 'prop-types';
import '../styles/buttons.css';

export default function RecommendedRecipes({ index, recommended, type }) {
  const MAX_RECOMMENDED = 6;
  if (type === 'meal') {
    return (
      <div className="recommended-card">
        {
          recommended && recommended.slice(0, MAX_RECOMMENDED).map((rec) => (
            <div key={ rec.strDrinks } data-testid={ `${index}-recomendation-card` }>
              <h2 data-testid="recipe-category">{rec.strCategory}</h2>
              <img src={ rec.strDrinkThumb } width="200" alt={ rec.strDrink } />
            </div>))
        }
        <button type="button">Iniciar Receita</button>
      </div>
    );
  }
  return (
    <div className="recommended-card">
      {
        recommended && recommended.slice(0, MAX_RECOMMENDED).map((rec) => (
          <div key={ rec.strDrinks } data-testid={ `${index}-recomendation-card` }>
            <h2 data-testid="recipe-category">{rec.strCategory}</h2>
            <img src={ rec.strMealThumb } alt={ rec.strMeal } />
          </div>))
      }
      <button className="btn buttons" type="button">Iniciar Receita</button>
    </div>
  );
}

RecommendedRecipes.propTypes = {
  index: PropTypes.number.isRequired,
  recommended: PropTypes.arrayOf(PropTypes.object).isRequired,
  type: PropTypes.string.isRequired,
};
