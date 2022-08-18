import { useProductsAutocompleteQuery } from "src/graphql/types"
import { useLoginUser } from "~/ui/common/hooks/useLoginUser"
import { connectionToNodes } from "~/ui/common/utils/connectionToNodes"

export function useProducts() {
  const { userId } = useLoginUser()
  const { data, loading, error } = useProductsAutocompleteQuery({
    variables: { userId: userId },
  })

  const products = connectionToNodes(data?.products)

  return {
    products: products,
    loading: loading,
    error: error,
  }
}
