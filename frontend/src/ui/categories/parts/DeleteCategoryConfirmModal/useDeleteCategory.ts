import {
  Categories_CategoryFragment,
  CategoriesDocument,
  useDeleteCategoryMutation,
} from "src/graphql/types"
import { useLoginUser } from "src/ui/common/hooks/useLoginUser"

export function useDeleteCategory(
  category: Categories_CategoryFragment | null,
) {
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
