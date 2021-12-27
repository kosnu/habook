import { TextField } from "@mui/material"
import React from "react"

interface CategoryNameInputProps {
  name: string
  error: boolean
  helperText: string
  onChange: (input: string) => void
  onBlur: () => void
}

export function CategoryNameInput({
  name,
  error,
  helperText,
  onChange,
  onBlur,
}: CategoryNameInputProps) {
  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const name = event.target.value
    onChange(name)
  }

  function handleBlur() {
    onBlur()
  }

  return (
    <>
      <TextField
        id={"category-name-input"}
        label={"カテゴリー名"}
        variant={"standard"}
        fullWidth
        error={error}
        value={name}
        onChange={handleChange}
        onBlur={handleBlur}
        helperText={helperText}
      />
    </>
  )
}
