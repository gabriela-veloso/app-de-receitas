import React, { useContext, useState, useEffect } from 'react';
import RecipesContext from '../contexts/RecipesContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { fetchDrinkOnLoad } from '../services/bebidasApi';

export default function Drinks() {
  const { drinksData } = useContext(RecipesContext);
  const [drinks, setDrinks] = useState(drinksData);
  const MAX_NUM = 12;

  useEffect(() => {
    async function handleDrinksOnLoad() {
      if (drinksData.length === 0) {
        const dataDrinks = await fetchDrinkOnLoad();
        setDrinks(dataDrinks);
      }
    }
    handleDrinksOnLoad();
  }, [drinksData]);

  return (
    <div>
      <Header title="Bebidas" />
      { drinks && drinks.slice(0, MAX_NUM).map((elem, index) => (
        <div
          data-testid={ `${index}-recipe-card` }
          key={ elem.idDrink }
        >
          <img
            data-testid={ `${index}-card-img` }
            src={ elem.strDrinkThumb }
            alt="drinksCard"
            width="50"
          />
          <h3
            data-testid={ `${index}-card-name` }
          >
            { elem.strDrink }
          </h3>
        </div>
      ))}
      <Footer />
    </div>
  );
}
