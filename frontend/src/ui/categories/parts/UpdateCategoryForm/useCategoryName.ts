import produce, { Draft } from "immer"
import {
  atomFamily,
  DefaultValue,
  selectorFamily,
  useRecoilState,
  useSetRecoilState,
} from "recoil"
import { Categories_CategoryFragment } from "src/graphql/types"

interface CategoryNameInputAtom {
  categoryName: string
  validation: {
    invalid: boolean
    message: string
  }
}

export const updateCategoryNameInputAtom = atomFamily<
  CategoryNameInputAtom,
  Categories_CategoryFragment | null
>({
  key: "update-category-name-atom-family",
  default: (category) => {
    return {
      categoryName: category?.name ?? "",
      validation: {
        invalid: false,
        message: "",
      },
    }
  },
})

export const updateCategoryNameInputSelector = selectorFamily<
  CategoryNameInputAtom,
  Categories_CategoryFragment | null
>({
  key: "update-category-name-selector-family",
  get:
    (category) =>
    ({ get }) => {
      return get(updateCategoryNameInputAtom(category))
    },
  set:
    (category) =>
    ({ set }, newValue) => {
      if (!category) return
      if (newValue instanceof DefaultValue) return

      set(updateCategoryNameInputAtom(category), newValue)
    },
})

export function useCategoryName(category: Categories_CategoryFragment | null) {
  const [state] = useRecoilState(updateCategoryNameInputSelector(category))
  const setState = useSetRecoilState(updateCategoryNameInputAtom(category))

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
