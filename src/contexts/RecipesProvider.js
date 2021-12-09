import PropTypes from 'prop-types';
import React, { useState } from 'react';
import RecipesContext from './RecipesContext';
import * as comidasApi from '../services/comidasApi';
import * as bebidasApi from '../services/bebidasApi';

export default function RecipesProvider({ children }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [disabled, setDisabled] = useState(true);
  const [mealsData, setMealsData] = useState([]);
  const [drinksData, setDrinksData] = useState([]);

  const getMealsData = async (string, category) => {
    if (category === 'ingredient') {
      const data = await comidasApi.fetchFoodByIngredients(string);
      console.log(data);
      setMealsData(data);
    } else if (category === 'name') {
      const data = await comidasApi.fetchFoodByName(string);
      setMealsData(data);
    } else {
      const data = await comidasApi.fetchFoodByLetter(string);
      setMealsData(data);
    }
  };

  const getDrinksData = async (string, category) => {
    if (category === 'ingredient') {
      const data = await bebidasApi.fetchDrinkByIngredients(string);
      setDrinksData(data);
    } else if (category === 'name') {
      const data = await bebidasApi.fetchDrinkByName(string);
      setDrinksData(data);
    } else {
      const data = await bebidasApi.fetchDrinkByLetter(string);
      setDrinksData(data);
    }
  };

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
    mealsData,
    getMealsData,
    drinksData,
    getDrinksData,
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
