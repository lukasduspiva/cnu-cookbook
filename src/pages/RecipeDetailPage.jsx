import { Box, Heading, Table, TableContainer, Tbody, Td, Th, Thead, Tr, Flex,
  ListItem,
  OrderedList,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { api } from "../api";
import { ErrorMessage } from "../components/ErrorMessage";
import { Loader } from "../components/Loader";

const initialState = {
  data: null,
  isLoading: false,
  isError: false,
};

const split = (instructions) => instructions
  .split('\n')
  .filter(step => step !== '')
  .map(step => step.slice(3));

export function RecipeDetailPage() {
  const { slug } = useParams();
  const [{ data, isLoading, isError }, setState] = useState(initialState);

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
    api.get(`/recipes/${slug}`).then(handleFetchSuccess).catch(handleFetchError);
  };

  useEffect(fetchItems, [slug]);

  return (
    <>
      {isLoading && <Loader />}
      {isError && <ErrorMessage>Nastala chyba</ErrorMessage>}
      {data && (
        <>
          <Heading my={4} color="dodgerblue">
            {data.title}
          </Heading>
          <Flex>
            <Box display="flex" flexDirection="column" mr={8}>
              <TableContainer mb={8}>
                <Table variant='simple'>
                  <Tbody>
                    <Tr>
                      <Td>Čas přípravy</Td>
                      <Td>{data.preparationTime}</Td>
                    </Tr>
                    <Tr>
                      <Td>Naposledy upraveno</Td>
                      <Td>{data.lastModifiedDate}</Td>
                    </Tr>
                    <Tr>
                      <Td>Počet porcí</Td>
                      <Td>{data.servingCount}</Td>
                    </Tr>
                  </Tbody>
                </Table>
              </TableContainer>
              <Heading as="h2" size="md">Ingredience</Heading>
              <TableContainer>
                <Table variant='simple'>
                  <Thead>
                    <Tr>
                      <Th>Název</Th>
                      <Th>Počet</Th>
                      <Th>Jednotka</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {data.ingredients.map(
                      ingredient => (
                        <Tr>
                          <Td>{ingredient.name}</Td>
                          <Td>{ingredient.amount || 'neznámý'}</Td>
                          <Td>{ingredient.amountUnit || 'neznámá'}</Td>
                        </Tr>
                      )
                    )}
                  </Tbody>
                </Table>
              </TableContainer>
            </Box>
            <Box flexDirection="column">
              <OrderedList spacing={4}>
                {split(data.directions).map(
                  step => <ListItem>{step}</ListItem>
                )}
              </OrderedList>
            </Box>
          </Flex>
        </>
      )}
    </>
  );
}
