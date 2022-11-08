import { useUpdateCategoryMutation } from "~/graphql/types"
import { useLoginUser } from "~/ui/common/hooks/useLoginUser"

export function useUpdateCategory() {
  const { userId } = useLoginUser()
  const [updateCategoryMutation, { loading }] = useUpdateCategoryMutation()

  async function updateCategory(categoryName: string, categoryId: string) {
    await updateCategoryMutation({
      variables: {
        userId: userId,
        id: categoryId,
        name: categoryName,
      },
    })
  }

  return {
    updateCategory: updateCategory,
    loading: loading,
  }
}
