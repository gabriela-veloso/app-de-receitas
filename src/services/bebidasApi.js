export async function fetchDrinkByIngredients(ingredient) {
  try {
    const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`);
    const json = await response.json();
    return json.drinks;
  } catch (error) {
    console.log('error', error);
  }
}

export async function fetchDrinkByName(name) {
  try {
    const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}`);
    const json = await response.json();
    return json.drinks;
  } catch (error) {
    console.log('error', error);
  }
}

export async function fetchDrinkByLetter(firstLetter) {
  try {
    const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${firstLetter}`);
    const json = await response.json();
    return json.drinks;
  } catch (error) {
    console.log('error', error);
  }
}

export async function fetchDrinkByCategories(category) {
  try {
    const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`);
    const json = await response.json();
    return json.meals;
  } catch (error) {
    console.log('error', error);
  }
}

export async function fecthDrinkById(id) {
  try {
    const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
    const json = await response.json();
    return json.drinks;
  } catch (error) {
    console.log('error', error);
  }
}
