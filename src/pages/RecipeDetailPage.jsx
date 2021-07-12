import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { api } from '../api';

export function RecipeDetailPage() {
  const { slug } = useParams();
  const [{ data, error, loading }, setRecipeDetail] = useState({
    data: {},
    error: '',
    loading: true,
  });

  useEffect(() => {
    api
      .get(`/recipes/${slug}`)
      .then(({ data }) => {
        // console.log(data);
        setRecipeDetail({ data, error: '', loading: false });
      })
      .catch(() => {
        setRecipeDetail({ data: {}, error: 'Hups, něco se pokazilo ...', loading: false });
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
      <h1>{data.title}</h1>

      <p>Délka přípravy: {data.preparationTime}</p>
      <p>Počet porcí: {data.servingCount}</p>

      <h2>Postup</h2>
      <p>{data.directions}</p>

      <h2>Ingredience</h2>
      <ul>
        {data.ingredients.map(({ _id, amount, amountUnit, name }) => (
          <li key={_id}>{`${name} - ${amount || ''} ${amountUnit || ''}`}</li>
        ))}
      </ul>
    </>
  );
}
