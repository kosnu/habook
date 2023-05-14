import React from "react"
import { DatePicker, DatePickerProps } from "@mui/x-date-pickers"
import { Control, useController, FieldPath, FieldValues } from "react-hook-form"

interface ControlledDatePickerProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
> extends Omit<DatePickerProps<Date>, "value" | "onChange" | "renderInput"> {
  name: TName
  control: Control<TFieldValues>
}

export function ControlledDatePicker<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
>({ name, control, ...props }: ControlledDatePickerProps<TFieldValues, TName>) {
  const { field, fieldState } = useController({
    control: control,
    name: name,
  })

  return (
    <>
      <DatePicker
        format={"yyyy/MM/dd"}
        {...props}
        {...field}
        slotProps={{
          ...props.slotProps,
          textField: {
            error: !!fieldState.error,
            helperText: fieldState.error?.message,
            ...props.slotProps?.textField,
          },
        }}
      />
    </>
  )
}
