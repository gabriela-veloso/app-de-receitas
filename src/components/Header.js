import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Header({ title, showSearchIcon = true }) {
  const [showSearchInput, setShowSearchInput] = useState(false);
  const [selectedRadio, setSelectedRadio] = useState('');
  const [inputTextValue, setInputTextValue] = useState('');

  const toggleSearchInput = () => {
    setShowSearchInput(!showSearchInput);
  };

  function handleClickSearch() {
    switch (selectedRadio) {
    case 'ingredient':
      break;
    case 'first-letter':
      if (inputTextValue.length > 1) {
        return global.alert('Sua busca deve conter somente 1 (um) caracter');
      }
      break;
    default:
      break;
    }
  }

  function selectRadio({ value }) {
    setSelectedRadio(value);
  }

  return (
    <div>
      <header>
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
      </header>
      { showSearchIcon && showSearchInput
      && (
        <div>
          <input
            type="text"
            data-testid="search-input"
            value={ inputTextValue }
            onChange={ ({ target }) => setInputTextValue(target.value) }
          />
          <br />
          <label htmlFor="ingredient">
            Ingrediente
            <input
              type="radio"
              id="ingredient"
              name="filter-radio"
              value="ingredient"
              data-testid="ingredient-search-radio"
              onChange={ selectRadio }
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
              onChange={ selectRadio }
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
              onChange={ selectRadio }
            />
          </label>
          <button
            type="button"
            data-testid="exec-search-btn"
            onClick={ handleClickSearch }
          >
            Buscar

          </button>
        </div>)}
    </div>
  );
}

Header.propTypes = {
  showSearchIcon: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
};
