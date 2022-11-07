import { useCreateCategoryMutation } from "~/graphql/types"
import { useLoginUser } from "~/ui/common/hooks/useLoginUser"

export function useCreateCategory() {
  const { userId } = useLoginUser()
  const [createCategoryMutation, { loading }] = useCreateCategoryMutation()

  async function createCategory(categoryName: string) {
    await createCategoryMutation({
      variables: {
        userId: userId,
        categoryName: categoryName,
      },
    })
  }

  return {
    createCategory: createCategory,
    loading: loading,
  }
}
