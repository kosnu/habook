import { useCallback } from "react"
import { useUpdateCategoryMutation } from "~/graphql/types"
import { useLoginUser } from "~/ui/common/hooks/useLoginUser"

export function useUpdateCategory() {
  const { userId } = useLoginUser()
  const [updateCategoryMutation, { loading }] = useUpdateCategoryMutation()

  const updateCategory = useCallback(
    async (categoryName: string, categoryId: string) => {
      await updateCategoryMutation({
        variables: {
          userId: userId,
          id: categoryId,
          name: categoryName,
        },
      })
    },
    [updateCategoryMutation, userId],
  )

  return {
    updateCategory: updateCategory,
    loading: loading,
  }
}
