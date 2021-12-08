import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Header({ title, showSearchIcon = true }) {
  const [showSearchInput, setShowSearchInput] = useState(false);

  const toggleSearchInput = () => {
    setShowSearchInput(!showSearchInput);
  };

  return (
    <div>
      <Link to="/perfil">
        <img
          src="/images/profileIcon.svg"
          alt="profile icon"
          data-testid="profile-top-btn"
        />
      </Link>
      <h1 data-testid="page-title">{ title }</h1>
      {
        showSearchIcon
      && (
        <button type="button" onClick={ toggleSearchInput }>
          <img
            src="/images/searchIcon.svg"
            alt="search icon"
            data-testid="search-top-btn"
          />
        </button>)
      }
      { showSearchIcon && showSearchInput
      && <input type="text" data-testid="search-input" />}
      <label htmlFor="ingredient">
        Ingrediente
        <input
          type="radio"
          id="ingredient"
          name="filter-radio"
          value="ingredient"
          data-testid="ingredient-search-radio"
        />
      </label>
      <label htmlFor="name">
        Nome
        <input
          type="radio"
          id="name"
          name="filter-radio"
          value="name"
          data-testid="name-search-radio"
        />
      </label>
      <label htmlFor="first-letter">
        Primeira Letra
        <input
          type="radio"
          id="first-letter"
          name="filter-radio"
          value="first-letter"
          data-testid="first-letter-search-radio"
        />
      </label>
      <button type="button" data-testid="exec-search-btn">Buscar</button>
    </div>
  );
}

Header.propTypes = {
  showSearchIcon: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
};
