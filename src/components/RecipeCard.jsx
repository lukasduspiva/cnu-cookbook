import {
  WrapItem,
  Center,
  Box,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';

export function RecipeCard({ item }) {
  const color = item.preparationTime > 100
    ? 'red.200'
    : 'yellow.200';

  return (
    <Link to={`/recept/${item.slug}`}>
      <WrapItem>
        <Center
          w='400px'
          h='300px'
          bg={color}
          flexDirection="column"
        >
          <Box as="strong">{item.title}</Box>
          <Box>{item.preparationTime || 'neznámý počet'} min</Box>
        </Center>
      </WrapItem>
    </Link>
  );
}
