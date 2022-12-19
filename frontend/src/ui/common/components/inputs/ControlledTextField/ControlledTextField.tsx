import React, { ChangeEvent, useCallback } from "react"
import { TextFieldProps, TextField } from "@mui/material"
import { Control, useController, FieldValues, FieldPath } from "react-hook-form"

type ControlledTextFieldProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
> = TextFieldProps & {
  name: TName
  control: Control<TFieldValues>
}

export function ControlledTextField<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
>({
  control,
  name,
  ...textFieldProps
}: ControlledTextFieldProps<TFieldValues, TName>) {
  const { field, fieldState } = useController({
    control: control,
    name: name,
  })

  const handleChange = useCallback(
    (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
      if (textFieldProps.type === "number") {
        field.onChange(Number(event.target.value))
      } else {
        field.onChange(event.target.value)
      }
    },
    [field, textFieldProps.type],
  )

  return (
    <>
      <TextField
        variant={"standard"}
        error={!!fieldState.error}
        helperText={fieldState.error?.message}
        {...textFieldProps}
        {...field}
        onChange={handleChange}
      />
    </>
  )
}
