import { atom, useRecoilState, useResetRecoilState } from "recoil"

const CATEGORY_SELECT_VALIDATION_MESSAGE = "カテゴリーを選択してください"

interface CategorySelect {
  categoryId: string
  validation: {
    message: string | null
    isError: boolean
  }
}

const categorySelectAtom = atom<CategorySelect>({
  key: "payments-category-select-atom",
  default: {
    categoryId: "",
    validation: {
      message: null,
      isError: false,
    },
  },
})

export function useCategorySelect() {
  const [value, setValue] = useRecoilState(categorySelectAtom)
  const resetCategorySelect = useResetRecoilState(categorySelectAtom)

  function handleCategoryChange(categoryId: string) {
    setValue({
      categoryId: categoryId,
      validation: {
        message: !categoryId ? CATEGORY_SELECT_VALIDATION_MESSAGE : null,
        isError: !categoryId,
      },
    })
  }

  function handleCategoryValidate() {
    setValue((currVal) => {
      return {
        ...currVal,
        validation: {
          message: !currVal.categoryId
            ? CATEGORY_SELECT_VALIDATION_MESSAGE
            : null,
          isError: !currVal.categoryId,
        },
      }
    })
  }

  return {
    categoryId: value.categoryId,
    categorySelectValidation: value.validation,
    changeCategory: handleCategoryChange,
    validateCategory: handleCategoryValidate,
    resetCategorySelect: resetCategorySelect,
  }
}
