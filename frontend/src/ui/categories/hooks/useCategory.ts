import { ApolloError } from "@apollo/client"
import { atom, useRecoilState } from "recoil"
import {
  Categories_CategoryFragment,
  useDeleteCategoryMutation,
} from "../../../graphql/types"
import { useSuccessSnackbar } from "../../common/components/molecules/SuccessSnackBar"
import { useWarningSnackbar } from "../../common/components/molecules/WarningSnackBar"
import { useLoginUser } from "../../common/hooks/useLoginUser"
import { useCategoryNameForm } from "./useCategoryNameForm"

const selectedCategoryState = atom<Categories_CategoryFragment | null>({
  key: "selected-category-state",
  default: null,
})

export function useCategory() {
  const [category, setCategory] = useRecoilState(selectedCategoryState)
  const { userId } = useLoginUser()
  const { changeCategoryName } = useCategoryNameForm()
  const [deleteCategory] = useDeleteCategoryMutation()
  const { openWarningSnackbar } = useWarningSnackbar()
  const { openSuccessSnackbar } = useSuccessSnackbar()

  function handleCategorySelect(category: Categories_CategoryFragment) {
    setCategory(category)
    changeCategoryName(category.name)
  }

  async function handleCategoryDelete() {
    try {
      if (category) {
        await deleteCategory({
          variables: { id: category.id, userId: userId },
        })
        openSuccessSnackbar("カテゴリーを削除しました")
      }
    } catch (e) {
      console.error(e)
      if (e instanceof ApolloError) {
        openWarningSnackbar(e.message)
      }
    }
  }

  return {
    selectedCategory: category,
    selectCategory: handleCategorySelect,
    deleteCategory: handleCategoryDelete,
  }
}
