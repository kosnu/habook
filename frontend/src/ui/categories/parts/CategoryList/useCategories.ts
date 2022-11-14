import { useCallback } from "react"
import {
  CategoriesQuery,
  CategoriesQueryVariables,
  useCategoriesQuery,
} from "~/graphql/types"
import { connectionToNodes } from "~/ui/common/utils/connectionToNodes"

export function useCategories(userId: string) {
  const { data, fetchMore, loading, error } = useCategoriesQuery({
    variables: { userId: userId },
  })

  const pageInfo = data?.categories.pageInfo
  const categories = connectionToNodes(data?.categories)

  const fetchMoreCategories = useCallback(async () => {
    try {
      await fetchMore<CategoriesQuery, CategoriesQueryVariables>({
        variables: {
          cursor: pageInfo?.endCursor ?? "",
        },
      })
    } catch (e) {
      console.error(e)
    }
  }, [fetchMore, pageInfo?.endCursor])

  return {
    loading: loading,
    error: error,
    categories: categories,
    pageInfo: pageInfo,
    fetchMore: fetchMoreCategories,
  }
}
