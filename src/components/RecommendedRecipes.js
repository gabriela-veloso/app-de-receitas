import React from 'react';
import PropTypes from 'prop-types';

export default function RecommendedRecipes({ index }) {
  return (
    <div data-testid={ `${index}-recomendation-card` }>
      Recomended Recipe
    </div>
  );
}

RecommendedRecipes.propTypes = {
  index: PropTypes.number.isRequired,
};
