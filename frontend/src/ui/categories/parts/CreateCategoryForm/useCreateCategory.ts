import { useCallback } from "react"
import { useCreateCategoryMutation } from "~/graphql/types"
import { useLoginUser } from "~/ui/common/hooks"

export function useCreateCategory() {
  const { userId } = useLoginUser()
  const [createCategoryMutation, { loading }] = useCreateCategoryMutation()

  const createCategory = useCallback(
    async (categoryName: string) => {
      await createCategoryMutation({
        variables: {
          userId: userId,
          categoryName: categoryName,
        },
      })
    },
    [createCategoryMutation, userId],
  )

  return {
    createCategory: createCategory,
    loading: loading,
  }
}
