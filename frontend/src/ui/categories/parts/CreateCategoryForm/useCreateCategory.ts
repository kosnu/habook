import { useRecoilValue } from "recoil"
import { useCreateCategoryMutation } from "src/graphql/types"
import { useLoginUser } from "src/ui/common/hooks/useLoginUser"
import { createCategoryNameInputAtom } from "./useCategoryName"

export function useCreateCategory() {
  const { userId } = useLoginUser()
  const categoryNameState = useRecoilValue(createCategoryNameInputAtom)
  const [createCategoryMutation] = useCreateCategoryMutation()

  const isInvalid = categoryNameState.validation.invalid

  async function createCategory() {
    await createCategoryMutation({
      variables: {
        userId: userId,
        categoryName: categoryNameState.categoryName,
      },
    })
  }

  return {
    isInvalid: isInvalid,
    createCategory: createCategory,
  }
}
