import { useCallback } from "react"
import { atom, useRecoilState } from "recoil"
import {
  Categories_CategoryFragment,
  useDeleteCategoryMutation,
  useUpdateCategoryMutation,
} from "../../../../graphql/types"
import { useSuccessSnackbar } from "../../../common/components/SuccessSnackBar"
import { useWarningSnackbar } from "../../../common/components/WarningSnackBar"
import { useLoginUser } from "../../../common/hooks/useLoginUser"
import { useCategoryNameForm } from "./useCategoryNameForm"

const selectedCategoryState = atom<Categories_CategoryFragment | null>({
  key: "selected-category-state",
  default: null,
})

export function useCategory() {
  const [category, setCategory] = useRecoilState(selectedCategoryState)
  const { userId } = useLoginUser()
  const { categoryName, validation, changeCategoryName } = useCategoryNameForm()
  const [updateCategory] = useUpdateCategoryMutation()
  const [deleteCategory] = useDeleteCategoryMutation()
  const { openWarningSnackbar } = useWarningSnackbar()
  const { openSuccessSnackbar } = useSuccessSnackbar()

  const handleCategorySelect = useCallback(
    (category: Categories_CategoryFragment) => {
      setCategory(category)
      changeCategoryName(category.name)
    },
    [setCategory, changeCategoryName],
  )

  const handleCategoryUpdate = useCallback(async () => {
    const invalid = validation.isError
    if (invalid || !category) {
      openWarningSnackbar("入力が正しくありません")
      return
    }
    try {
      await updateCategory({
        variables: { id: category.id, userId: userId, name: categoryName },
      })
      openSuccessSnackbar("カテゴリーを更新しました")
    } catch (e) {
      openWarningSnackbar(e.message)
    }
  }, [
    category,
    userId,
    categoryName,
    validation,
    updateCategory,
    openSuccessSnackbar,
    openWarningSnackbar,
  ])

  const handleCategoryDelete = useCallback(async () => {
    try {
      if (category) {
        await deleteCategory({
          variables: { id: category.id, userId: userId },
        })
        openSuccessSnackbar("カテゴリーを削除しました")
      }
    } catch (e) {
      openWarningSnackbar(e.message)
    }
  }, [
    category,
    userId,
    deleteCategory,
    openSuccessSnackbar,
    openWarningSnackbar,
  ])

  return {
    selectedCategory: category,
    selectCategory: handleCategorySelect,
    updateCategory: handleCategoryUpdate,
    deleteCategory: handleCategoryDelete,
  }
}
