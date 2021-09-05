import { TextField } from "@material-ui/core"
import React, { useCallback } from "react"
import { useCategoryNameForm } from "../hooks/useCategoryNameForm"

export function CategoryNameForm() {
  const { categoryName, validation, changeCategoryName, validateCategoryName } =
    useCategoryNameForm()

  const handleCategoryNameChange = useCallback(
    (event) => {
      const name = event.target.value as string
      changeCategoryName(name)
    },
    [changeCategoryName],
  )
  return (
    <>
      <TextField
        id="category-name-input"
        label="カテゴリー名"
        fullWidth
        error={validation.isError}
        value={categoryName}
        onChange={handleCategoryNameChange}
        onBlur={validateCategoryName}
        helperText={validation.message}
      />
    </>
  )
}
