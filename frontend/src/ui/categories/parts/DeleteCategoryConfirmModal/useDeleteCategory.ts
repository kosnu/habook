import { useCallback } from "react"
import { CategoriesDocument, useDeleteCategoryMutation } from "~/graphql/types"
import { Category } from "../../types"
import { useLoginUser } from "~/ui/common/hooks/useLoginUser"

export function useDeleteCategory(category: Category | null) {
  const { userId } = useLoginUser()
  const [deleteCategoryMutation] = useDeleteCategoryMutation({
    refetchQueries: [CategoriesDocument],
  })

  const deleteCategory = useCallback(async () => {
    category &&
      (await deleteCategoryMutation({
        variables: {
          userId: userId,
          id: category.id,
        },
      }))
  }, [category, deleteCategoryMutation, userId])

  return {
    deleteCategory: deleteCategory,
  }
}
