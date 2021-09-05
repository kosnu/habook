import { ApolloClient } from "@apollo/client"
import { cache } from "./cache"

export const client = new ApolloClient({
  uri: `${process.env.API_URL}/query`,
  cache: cache,
})
