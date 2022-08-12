import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material"
import React from "react"
import { ControllerRenderProps } from "react-hook-form"
import { CreatePaymentInput } from "../CreatePaymentForm"

interface NumberOfProductSelectProps {
  // TODO: `react-hook-form` に依存しない型定義をしたい
  selectProps: ControllerRenderProps<CreatePaymentInput, "numberOfProduct">
  invalid?: boolean
  errorMessage?: string
}

export function NumberOfProductSelect({
  selectProps,
  invalid,
  errorMessage,
}: NumberOfProductSelectProps) {
  return (
    <>
      <FormControl error={invalid} variant="standard" sx={{ minWidth: 100 }}>
        <InputLabel id={"number-select-label"}>個数</InputLabel>
        <Select<number>
          labelId={"number-select-label"}
          id={"number-select"}
          variant={"standard"}
          {...selectProps}
        >
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => {
            return (
              <MenuItem key={num} value={num}>
                {num}
              </MenuItem>
            )
          })}
        </Select>
        <FormHelperText>{errorMessage}</FormHelperText>
      </FormControl>
    </>
  )
}
