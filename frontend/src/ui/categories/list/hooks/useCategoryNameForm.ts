import { useCallback } from "react"
import { atom, useRecoilState, useResetRecoilState } from "recoil"

const updateCategoryNameState = atom<CategoryNameForm>({
  key: "update-category-name-state",
  default: {
    categoryName: "",
    validationMessage: {
      categoryName: null,
    },
  },
})

interface ValidationMessage {
  categoryName: string | null
}

interface CategoryNameForm {
  categoryName: string
  validationMessage: ValidationMessage
}

export function useCategoryNameForm() {
  const [state, setState] = useRecoilState(updateCategoryNameState)
  const resetCategoryName = useResetRecoilState(updateCategoryNameState)

  const handleCategoryNameChange = useCallback(
    (categoryName: string) => {
      const message =
        categoryName.length < 2 ? "2文字以上の名前を入力してください" : null
      setState({
        categoryName: categoryName,
        validationMessage: {
          categoryName: message,
        },
      })
    },
    [setState],
  )

  const handleCategoryNameValidate = useCallback(() => {
    setState((currVal) => {
      const message =
        currVal.categoryName.length < 2
          ? "2文字以上の名前を入力してください"
          : null
      return {
        ...currVal,
        validationMessage: {
          categoryName: message,
        },
      }
    })
  }, [setState])

  return {
    categoryName: state.categoryName,
    validation: {
      message: state.validationMessage.categoryName,
      isError: state.validationMessage.categoryName !== null,
    },
    changeCategoryName: handleCategoryNameChange,
    validateCategoryName: handleCategoryNameValidate,
    resetCategoryName: resetCategoryName,
  }
}
