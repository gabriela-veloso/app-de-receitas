import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';

export default function Header({ title, showSearchIcon = true }) {
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
      <Link to="/explorar">
        { showSearchIcon && (<img
          src="/images/searchIcon.svg"
          alt="search icon"
          data-testid="search-top-btn"
        />)}
      </Link>
    </div>
  );
}

Header.propTypes = {
  showSearchIcon: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
};
