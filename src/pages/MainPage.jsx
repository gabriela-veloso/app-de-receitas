import React, { useContext, useEffect, useState } from 'react';
import RecipesContext from '../contexts/RecipesContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { fetchFoodOnLoad } from '../services/comidasApi';

export default function MainPage() {
  const { mealsData } = useContext(RecipesContext);
  const [meals, setMeals] = useState(mealsData);
  const MAX_NUM = 12;

  useEffect(() => {
    async function handleMealsOnLoad() {
      if (mealsData.length === 0) {
        const food = await fetchFoodOnLoad();
        setMeals(food);
      }
    }
    handleMealsOnLoad();
  }, [mealsData]);

  return (
    <div>
      <Header title="Comidas" />
      { meals && meals.slice(0, MAX_NUM).map((elem, index) => (
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
