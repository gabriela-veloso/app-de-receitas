import PropTypes from 'prop-types';
import React, { useState } from 'react';
import RecipesContext from './RecipesContext';

export default function RecipesProvider({ children }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [disabled, setDisabled] = useState(true);

  const NUMBER_SIX = 6;

  const isDisabled = () => {
    if (
      email.includes('@')
      && email.includes('.com') && (password.length + 1 > NUMBER_SIX)) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  };

  const handleEmail = ({ target: { value } }) => {
    setEmail(value);
    isDisabled();
  };

  const handlePassword = ({ target: { value } }) => {
    setPassword(value);
    isDisabled();
  };

  const data = {
    handleEmail,
    handlePassword,
    email,
    password,
    disabled,
  };

  return (
    <RecipesContext.Provider value={ data }>
      {children}
    </RecipesContext.Provider>
  );
}

RecipesProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
