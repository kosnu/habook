import { useCategoriesQuery } from "src/graphql/types"
import { useLoginUser } from "src/ui/common/hooks/useLoginUser"
import { connectionToNodes } from "src/ui/common/utils/connectionToNodes"

export function useCategories() {
  const { userId } = useLoginUser()
  const { data, loading } = useCategoriesQuery({
    variables: { userId: userId },
  })

  const categories = connectionToNodes(data?.categories)

  return {
    categories: categories,
    loading: loading,
  }
}
