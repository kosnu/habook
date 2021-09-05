import { TextField } from "@material-ui/core"
import React, { useCallback } from "react"
import { useCreateCategory } from "../hooks/useCreateCategory"

export function CategoryNameInput() {
  const {
    categoryName,
    validationMessage,
    onCategoryNameChange,
    onCategoryNameValidate,
  } = useCreateCategory()

  const isError = !!validationMessage.categoryName

  const handleCategoryNameChange = useCallback(
    (event) => {
      const name: string = event.target.value
      onCategoryNameChange(name)
    },
    [onCategoryNameChange],
  )

  return (
    <>
      <TextField
        id="category-name-input"
        label="カテゴリー名"
        error={isError}
        value={categoryName}
        onChange={handleCategoryNameChange}
        onBlur={onCategoryNameValidate}
        helperText={validationMessage.categoryName}
      />
    </>
  )
}
