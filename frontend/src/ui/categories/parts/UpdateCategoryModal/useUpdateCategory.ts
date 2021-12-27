import { useRecoilValue } from "recoil"
import {
  Categories_CategoryFragment,
  CategoriesDocument,
  useUpdateCategoryMutation,
} from "src/graphql/types"
import { useLoginUser } from "src/ui/common/hooks/useLoginUser"
import { updateCategoryNameInputSelector } from "../UpdateCategoryForm/useCategoryName"

export function useUpdateCategory(
  category: Categories_CategoryFragment | null,
) {
  const { userId } = useLoginUser()
  const categoryNameState = useRecoilValue(
    updateCategoryNameInputSelector(category),
  )
  const [updateCategoryMutation] = useUpdateCategoryMutation({
    refetchQueries: [CategoriesDocument],
  })

  const isInvalid = categoryNameState.validation.invalid

  async function updateCategory() {
    await updateCategoryMutation({
      variables: {
        userId: userId,
        id: category?.id ?? "",
        name: categoryNameState.categoryName,
      },
    })
  }

  return {
    isInvalid: isInvalid,
    updateCategory: updateCategory,
  }
}
