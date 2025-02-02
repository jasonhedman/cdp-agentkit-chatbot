import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';

const httpLink = createHttpLink({
  uri: 'https://blue-api.morpho.org/graphql',
});

export const morphoClient = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
}); 