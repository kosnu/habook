import { TextField, TextFieldProps } from "@mui/material"
import { DatePicker } from "@mui/x-date-pickers"
import { DatePickerProps } from "@mui/x-date-pickers/DatePicker/DatePicker"
import React from "react"
import { Control, useController, FieldPath, FieldValues } from "react-hook-form"

interface ControlledDatePickerProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
  TInputDate = Date,
  TDate = TInputDate,
> extends Omit<
    DatePickerProps<TInputDate, TDate>,
    "value" | "onChange" | "renderInput"
  > {
  name: TName
  control: Control<TFieldValues>
  inputProps?: TextFieldProps
}

export function ControlledDatePicker<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
  TInputDate = Date,
  TDate = TInputDate,
>({
  name,
  control,
  inputProps,
  ...props
}: ControlledDatePickerProps<TFieldValues, TName, TInputDate, TDate>) {
  const { field, fieldState } = useController({
    control: control,
    name: name,
  })

  return (
    <>
      <DatePicker
        mask={"____/__/__"}
        inputFormat={"yyyy/MM/dd"}
        {...props}
        {...field}
        renderInput={(params) => (
          <TextField
            {...params}
            error={!!fieldState.error}
            helperText={fieldState.error?.message}
            {...inputProps}
          />
        )}
      />
    </>
  )
}
