import { TextField } from "@mui/material"
import React from "react"
import { useCategoryNameForm } from "../../hooks/useCategoryNameForm"

export function CategoryNameForm() {
  const { categoryName, validation, changeCategoryName, validateCategoryName } =
    useCategoryNameForm()

  function handleCategoryNameChange(
    event: React.ChangeEvent<HTMLInputElement>,
  ) {
    const name = event.target.value
    changeCategoryName(name)
  }

  return (
    <>
      <TextField
        id="category-name-input"
        label="カテゴリー名"
        variant={"standard"}
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
