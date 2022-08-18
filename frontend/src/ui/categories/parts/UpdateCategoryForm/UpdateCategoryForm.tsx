import React from "react"
import { Categories_CategoryFragment } from "~/graphql/types"
import { CategoryNameInput } from "../CategoryNameInput"
import { useCategoryName } from "./useCategoryName"

interface UpdateCategoryFormProps {
  category: Categories_CategoryFragment | null
}

export function UpdateCategoryForm({ category }: UpdateCategoryFormProps) {
  const {
    categoryName,
    validateCategoryName,
    changeCategoryName,
    invalid,
    validationMessage,
  } = useCategoryName(category)

  function handleCategoryNameChange(input: string) {
    changeCategoryName(input)
  }

  function handleCategoryNameBlur() {
    validateCategoryName()
  }

  return (
    <>
      <CategoryNameInput
        name={categoryName}
        error={invalid}
        helperText={validationMessage}
        onChange={handleCategoryNameChange}
        onBlur={handleCategoryNameBlur}
      />
    </>
  )
}
