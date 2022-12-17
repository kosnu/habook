import { useCategoriesQuery } from "~/graphql/types"
import { useLoginUser } from "~/ui/common/hooks"
import { connectionToNodes } from "~/ui/common/utils"

export function useCategories() {
  const { userId } = useLoginUser()
  const { data, loading, error } = useCategoriesQuery({
    variables: { userId: userId },
  })

  const categories = connectionToNodes(data?.categories)

  if (error) {
    console.error("CategoriesQuery:", error)
  }

  return {
    categories: categories,
    loading: loading,
    error: error,
  }
}
