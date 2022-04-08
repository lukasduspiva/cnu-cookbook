import React, { useEffect, useState } from 'react';
import {
  Heading,
  Wrap,
  Input,
} from '@chakra-ui/react';

import { api } from '../api';
import { RecipeCard } from '../components/RecipeCard';
import { Loader } from '../components/Loader';
import { ErrorMessage } from '../components/ErrorMessage';

const initialState = {
  data: null,
  isLoading: false,
  isError: false,
};

const normalize = (string) => {
  return string.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
}

export function RecipeListPage() {
  const [state, setState] = useState(initialState);
  const [searchText, setSearchText] = useState('');

  const handleFetchSuccess = ({ data }) => {
    setState({
      data: data,
      isLoading: false,
      isError: false,
    });
  }

  const handleFetchError = () => {
    setState({
      data: null,
      isLoading: false,
      isError: true,
    });
  }

  const fetchItems = () => {
    setState({
      data: null,
      isLoading: true,
      isError: false,
    });
    api.get('/recipes').then(handleFetchSuccess).catch(handleFetchError);
  };

  useEffect(fetchItems, []);

  const shouldRenderData = state.data;
  const shouldRenderLoading = state.isLoading;
  const shouldRenderError = state.isError;

  return (
    <>
      <Heading my={4} color="dodgerblue">
        Recepty
      </Heading>
      {shouldRenderLoading && <Loader />}
      {shouldRenderError && <ErrorMessage>Nastala chyba</ErrorMessage>}
      {shouldRenderData && (
        <>
          <Input
            maxWidth="300px"
            type="text"
            value={searchText}
            onChange={(e) =>
              setSearchText(e.target.value)}
          />
          <Wrap mt={8} spacing={8}>
            {state.data
              .filter(item => {
                const normalizedSearchText = normalize(searchText);
                const normalizedTitle = normalize(item.title);

                return normalizedTitle.includes(normalizedSearchText);
              })
              .sort((a, b) => a.preparationTime - b.preparationTime)
              .map(item => {
                return (
                  <RecipeCard key={item._id} item={item} />
                );
              })}
          </Wrap>
        </>
      )}
    </>
  );
}
