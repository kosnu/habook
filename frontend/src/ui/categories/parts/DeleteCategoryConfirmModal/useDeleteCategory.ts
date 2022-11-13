import { CategoriesDocument, useDeleteCategoryMutation } from "~/graphql/types"
import { Category } from "../../types"
import { useLoginUser } from "~/ui/common/hooks/useLoginUser"

export function useDeleteCategory(category: Category | null) {
  const { userId } = useLoginUser()
  const [deleteCategoryMutation] = useDeleteCategoryMutation({
    refetchQueries: [CategoriesDocument],
  })

  async function deleteCategory() {
    category &&
      (await deleteCategoryMutation({
        variables: {
          userId: userId,
          id: category.id,
        },
      }))
  }

  return {
    deleteCategory: deleteCategory,
  }
}
