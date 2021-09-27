import { ApolloError } from "@apollo/client"
import { useUpdateCategoryMutation } from "../../../graphql/types"
import { useSuccessSnackbar } from "../../common/components/molecules/SuccessSnackBar"
import { useWarningSnackbar } from "../../common/components/molecules/WarningSnackBar"
import { useLoginUser } from "../../common/hooks/useLoginUser"
import { useCategory } from "./useCategory"
import { useCategoryNameForm } from "./useCategoryNameForm"

export function useUpdateCategoryForm() {
  const { userId } = useLoginUser()
  const { categoryName, validation, resetCategoryName, validateCategoryName } =
    useCategoryNameForm()
  const { selectedCategory } = useCategory()
  const [updateCategory] = useUpdateCategoryMutation()
  const { openSuccessSnackbar } = useSuccessSnackbar()
  const { openWarningSnackbar } = useWarningSnackbar()

  const invalid = validation.isError

  function handleUpdateFormValidate() {
    validateCategoryName()
  }

  async function handleCategoryUpdate() {
    if (invalid || !selectedCategory) {
      openWarningSnackbar("入力が正しくありません")

      return
    }
    try {
      await updateCategory({
        variables: {
          id: selectedCategory.id,
          userId: userId,
          name: categoryName,
        },
      })
      openSuccessSnackbar("カテゴリーを更新しました")
      resetForm()
    } catch (e) {
      console.error(e)
      if (e instanceof ApolloError) {
        openWarningSnackbar(e.message)
      }
    }
  }

  function resetForm() {
    resetCategoryName()
  }

  return {
    invalid: invalid,
    validateUpdateForm: handleUpdateFormValidate,
    updateCategory: handleCategoryUpdate,
    resetForm: resetForm,
  }
}
