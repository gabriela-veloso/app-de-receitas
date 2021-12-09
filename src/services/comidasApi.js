export async function fetchFoodByIngredients(ingredient) {
  try {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`);
    const json = await response.json();
    return json.meals;
  } catch (error) {
    console.log('error', error);
  }
}

export async function fetchFoodByName(name) {
  try {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`);
    const json = await response.json();
    return json.meals;
  } catch (error) {
    console.log('error', error);
  }
}

export async function fetchFoodByLetter(firstLetter) {
  try {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${firstLetter}`);
    const json = await response.json();
    return json.meals;
  } catch (error) {
    console.log('error', error);
  }
}

export async function fetchFoodByCategories(category) {
  try {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
    const json = await response.json();
    return json.meals;
  } catch (error) {
    console.log('error', error);
  }
}

export function fecthFoodById(id) {
  return fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${id}`)
    .then((results) => results.json()
      .then((data) => (results
        .ok ? Promise.resolve(data.meals) : Promise.reject(data.meals))));
}

export async function fetchFoodCategories() {
  const response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
  const json = await response.json();
  return json.meals;
}
