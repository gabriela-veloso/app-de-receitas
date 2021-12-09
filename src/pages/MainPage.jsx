import React, { useContext } from 'react';
import RecipesContext from '../contexts/RecipesContext';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function MainPage() {
  const { mealsData } = useContext(RecipesContext);
  console.log(mealsData);
  const MAX_NUM = 12;

  return (
    <div>
      <Header title="Comidas" />
      { mealsData && mealsData.slice(0, MAX_NUM).map((elem, index) => (
        <div
          data-testid={ `${index}-recipe-card` }
          key={ elem.idMeal }
        >
          <img
            data-testid={ `${index}-card-img` }
            src={ elem.strMealThumb }
            alt="Imagem da receita"
            width="50"
          />
          <h3
            data-testid={ `${index}-card-name` }
          >
            { elem.strMeal }
          </h3>
        </div>
      ))}
      <Footer />
    </div>
  );
}
