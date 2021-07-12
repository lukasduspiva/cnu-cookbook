import React from 'react';
import { Row, CardDeck } from 'react-bootstrap';

import { Recipe } from './Recipe';

function RecipeList({ recipes }) {
  return (
    <Row>
      <CardDeck>
        {recipes.map(({ _id, title, preparationTime, slug }) => (
          <Recipe key={_id} title={title} preparationTime={preparationTime} slug={slug} />
        ))}
      </CardDeck>
    </Row>
  );
}

export default RecipeList;
