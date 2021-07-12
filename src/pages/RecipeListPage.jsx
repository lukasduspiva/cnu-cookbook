import React, { useEffect, useState } from 'react';

import { RecipeFilter } from '../components/RecipeFilter';
import { RecipeList } from '../components/RecipeList';
import { api } from '../api';

export function RecipeListPage() {
  const [{ data, error, loading }, setRecipeList] = useState({
    data: [],
    error: '',
    loading: true,
  });
  const [recipe, setRecipe] = useState('');

  const filteredRecipes = data.filter(({ title }) =>
    title.toLowerCase().includes(recipe.toLowerCase()),
  );

  useEffect(() => {
    api
      .get('/recipes')
      .then(({ data }) => {
        // console.log(data);
        setRecipeList({ data, error: '', loading: false });
      })
      .catch(() => {
        setRecipeList({ data: [], error: 'Něco se pokazilo ...', loading: false });
      });
  }, []);

  if (loading) {
    return 'Loading ...';
  }

  if (!!error) {
    return error;
  }

  return (
    <>
      <h1>Recepty</h1>
      <RecipeFilter recipe={recipe} setRecipe={setRecipe} />

      <RecipeList recipes={filteredRecipes} />
    </>
  );
}
