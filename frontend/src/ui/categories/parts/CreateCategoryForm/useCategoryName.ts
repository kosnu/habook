import produce, { Draft } from "immer"
import { atom, useRecoilState } from "recoil"

interface CategoryNameInputAtom {
  categoryName: string
  validation: {
    invalid: boolean
    message: string
  }
}

export const createCategoryNameInputAtom = atom<CategoryNameInputAtom>({
  key: "create-category-name-atom",
  default: {
    categoryName: "",
    validation: {
      invalid: false,
      message: "",
    },
  },
})

export function useCategoryName() {
  const [state, setState] = useRecoilState(createCategoryNameInputAtom)

  function changeCategoryName(input: string) {
    setState(
      produce((draft: Draft<CategoryNameInputAtom>) => {
        draft.categoryName = input
      }),
    )
  }

  function validateCategoryName() {
    setState(
      produce((draft: Draft<CategoryNameInputAtom>) => {
        const invalid = draft.categoryName.length < 2

        draft.validation.invalid = invalid
        draft.validation.message = invalid
          ? "2文字以上の名前を入力してください"
          : ""
      }),
    )
  }

  return {
    categoryName: state.categoryName,
    invalid: state.validation.invalid,
    validationMessage: state.validation.message,
    changeCategoryName: changeCategoryName,
    validateCategoryName: validateCategoryName,
  }
}
