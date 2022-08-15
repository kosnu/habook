import { TextField } from "@mui/material"
import { DatePicker } from "@mui/x-date-pickers"
import React from "react"
import { ControllerRenderProps } from "react-hook-form"
import { PaymentFormInput } from "../../types"

interface PaidOnDatePickerProps {
  // TODO: `react-hook-form` に依存しない型定義をしたい
  datePickerProps: ControllerRenderProps<PaymentFormInput, "paidOnDate">
  invalid?: boolean
  errorMessage?: string
}

export function PaidOnDatePicker({
  datePickerProps,
  invalid,
  errorMessage,
}: PaidOnDatePickerProps) {
  return (
    <>
      <DatePicker
        label={"支払日"}
        mask={"____/__/__"}
        inputFormat={"yyyy/MM/dd"}
        renderInput={(params) => (
          <TextField
            variant={"standard"}
            {...params}
            error={invalid}
            helperText={errorMessage}
          />
        )}
        {...datePickerProps}
      />
    </>
  )
}
