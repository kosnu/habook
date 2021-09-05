import { useCallback } from "react"
import { atom, selector, useRecoilState } from "recoil"

const createCategoryState = atom<CreateCategoryType>({
  key: "create-category-state",
  default: {
    categoryName: "",
    validationMessage: {
      categoryName: "",
    },
  },
})

interface ValidationMessage {
  categoryName: string
}

interface CreateCategoryType {
  categoryName: string
  validationMessage: ValidationMessage
}

interface ReturnType extends CreateCategoryType {
  onCategoryNameChange: (categoryName: string) => void
  onCategoryNameValidate: () => void
}

export function useCreateCategory(): ReturnType {
  const [createCategoryParams, setCreateCategoryParams] =
    useRecoilState(createCategoryState)

  const handleCategoryNameChange = useCallback(
    (categoryName: string) => {
      setCreateCategoryParams((currVal) => {
        return {
          ...currVal,
          categoryName: categoryName,
        }
      })
    },
    [setCreateCategoryParams],
  )

  const handleCategoryNameValidate = useCallback(() => {
    const message =
      createCategoryParams.categoryName.length < 2
        ? "2文字以上の名前を入力してください"
        : ""
    setCreateCategoryParams((currVal) => {
      return {
        ...currVal,
        validationMessage: {
          ...currVal.validationMessage,
          categoryName: message,
        },
      }
    })
  }, [createCategoryParams, setCreateCategoryParams])

  return {
    ...createCategoryParams,
    onCategoryNameChange: handleCategoryNameChange,
    onCategoryNameValidate: handleCategoryNameValidate,
  }
}

export const createCategoryParamsSelector = selector({
  key: "create-category-selector",
  get: ({ get }) => {
    return {
      ...get(createCategoryState),
    }
  },
})
