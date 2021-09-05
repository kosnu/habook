import { InMemoryCache } from "@apollo/client"

export const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        categories: {
          keyArgs: false,
          merge,
        },
        products: {
          keyArgs: false,
          merge,
        },
      },
    },
  },
})

// TODO: anyをどうにかする
// eslint-disable-next-line  @typescript-eslint/no-explicit-any
function merge(existing: any, incoming: any) {
  if (!incoming) return existing
  if (!existing) return incoming
  const { edges, ...rest } = incoming
  const result = rest
  result.edges = [...existing.edges, ...edges]
  return result
}
