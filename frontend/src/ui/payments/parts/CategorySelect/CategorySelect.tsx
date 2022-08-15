import {
  CircularProgress,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material"
import React from "react"
import { ControllerRenderProps } from "react-hook-form"
import { PaymentFormInput } from "../../types"
import { useCategories } from "./useCategories"

interface CategorySelectProps {
  // TODO: `react-hook-form` に依存しない型定義をしたい
  selectProps: ControllerRenderProps<PaymentFormInput, "categoryId">
  invalid?: boolean
  errorMessage?: string
}

export function CategorySelect({
  selectProps,
  invalid,
  errorMessage,
}: CategorySelectProps) {
  const { categories, loading } = useCategories()

  return (
    <>
      <FormControl error={invalid} variant="standard" sx={{ minWidth: 200 }}>
        <InputLabel id={"category-select-label"}>カテゴリー</InputLabel>
        <Select
          id={"category-select"}
          labelId={"category-select-label"}
          {...selectProps}
        >
          {loading && <CircularProgress />}
          <MenuItem value={""}>
            {categories.length >= 0 ? "未選択" : "選択肢がありません"}
          </MenuItem>
          {categories.map((category) => {
            return (
              <MenuItem key={category.id} value={category.id}>
                {category.name}
              </MenuItem>
            )
          })}
        </Select>
        <FormHelperText>{errorMessage}</FormHelperText>
      </FormControl>
    </>
  )
}
