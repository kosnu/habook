import { useCreateCategoryMutation } from "../../../graphql/types"
import { useSuccessSnackbar } from "../../common/components/molecules/SuccessSnackBar"
import { useWarningSnackbar } from "../../common/components/molecules/WarningSnackBar"
import { useLoginUser } from "../../common/hooks/useLoginUser"
import { useCategoryNameForm } from "./useCategoryNameForm"

export function useCreateCategoryForm() {
  const { userId } = useLoginUser()
  const { categoryName, validation, resetCategoryName, validateCategoryName } =
    useCategoryNameForm()
  const [createCategory] = useCreateCategoryMutation()
  const { openSuccessSnackbar } = useSuccessSnackbar()
  const { openWarningSnackbar } = useWarningSnackbar()

  const invalid = validation.isError

  function validateCreateForm() {
    validateCategoryName()
  }

  async function handleCategoryCreate() {
    if (invalid) {
      openWarningSnackbar("入力が正しくありません")

      return
    }

    try {
      await createCategory({
        variables: { userId: userId, categoryName: categoryName },
      })
      openSuccessSnackbar("カテゴリーが作成できました")
      resetForm()
    } catch (e) {
      openWarningSnackbar(e.message)
    }
  }

  function resetForm() {
    resetCategoryName()
  }

  return {
    invalid: invalid,
    validateCreateForm: validateCreateForm,
    createCategory: handleCategoryCreate,
    resetForm: resetForm,
  }
}
