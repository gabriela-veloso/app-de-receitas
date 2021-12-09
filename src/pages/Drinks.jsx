import React, { useContext } from 'react';
import RecipesContext from '../contexts/RecipesContext';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Drinks() {
  const { drinksData } = useContext(RecipesContext);
  console.log(drinksData);
  const MAX_NUM = 12;

  return (
    <div>
      <Header title="Bebidas" />
      { drinksData && drinksData.slice(0, MAX_NUM).map((elem, index) => (
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
