import { useCallback } from "react"
import { useDeleteCategoryMutation } from "~/graphql/types"
import { Category } from "../../types"

export function useDeleteCategory() {
  const [deleteCategoryMutation, { loading }] = useDeleteCategoryMutation()

  const deleteCategory = useCallback(
    async (category: Category, userId: string) => {
      await deleteCategoryMutation({
        variables: {
          userId: userId,
          id: category.id,
        },
      })
    },
    [deleteCategoryMutation],
  )

  return {
    deleteCategory: deleteCategory,
    loading: loading,
  }
}
