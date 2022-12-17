import { useProductsAutocompleteQuery } from "~/graphql/types"
import { useLoginUser } from "~/ui/common/hooks"
import { connectionToNodes } from "~/ui/common/utils/connectionToNodes"

export function useProducts() {
  const { userId } = useLoginUser()
  const { data, loading, error } = useProductsAutocompleteQuery({
    variables: { userId: userId },
  })

  const products = connectionToNodes(data?.products)

  if (error) {
    console.error("ProductsAutocompleteQuery", error)
  }

  return {
    products: products,
    loading: loading,
    error: error,
  }
}
