import React, { ReactNode, useId } from "react"
import {
  FormControl,
  FormHelperText,
  InputLabel,
  Select,
  SelectProps,
} from "@mui/material"
import { FormControlProps } from "@mui/material/FormControl/FormControl"
import { Control, useController, FieldPath, FieldValues } from "react-hook-form"

interface ControlledSelectProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
> extends SelectProps {
  name: TName
  control: Control<TFieldValues>
  label?: ReactNode
  formControlProps?: FormControlProps
}

export function ControlledSelect<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
>({
  control,
  name,
  label,
  formControlProps,
  children,
  ...selectProps
}: ControlledSelectProps<TFieldValues, TName>) {
  const { field, fieldState } = useController({
    control: control,
    name: name,
  })
  const labelId = useId()

  return (
    <>
      <FormControl
        error={!!fieldState.error}
        variant={"standard"}
        {...formControlProps}
      >
        <InputLabel id={labelId}>{label}</InputLabel>
        <Select labelId={labelId} {...selectProps} {...field}>
          {children}
        </Select>
        <FormHelperText>{fieldState.error?.message}</FormHelperText>
      </FormControl>
    </>
  )
}
