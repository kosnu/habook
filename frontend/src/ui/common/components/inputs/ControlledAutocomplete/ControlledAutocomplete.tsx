import { AutocompleteValue } from "@mui/base/AutocompleteUnstyled/useAutocomplete"
import {
  Autocomplete,
  AutocompleteProps,
  TextField,
  TextFieldProps,
} from "@mui/material"
import React, { ReactNode, useCallback } from "react"
import { Control, useController, FieldPath, FieldValues } from "react-hook-form"

interface ControlledAutocompleteProps<
  T,
  Multiple extends boolean | undefined,
  DisableClearable extends boolean | undefined,
  FreeSolo extends boolean | undefined,
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
> extends Omit<
    AutocompleteProps<T, Multiple, DisableClearable, FreeSolo>,
    "onChange" | "onInputChange" | "renderInput"
  > {
  name: TName
  control: Control<TFieldValues>
  label?: ReactNode
  inputProps?: TextFieldProps
  onInputChange: (inputValue: string) => void
  onChange: (
    value: AutocompleteValue<T, Multiple, DisableClearable, FreeSolo>,
  ) => void
}

export function ControlledAutocomplete<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
  T,
  Multiple extends boolean | undefined = false,
  DisableClearable extends boolean | undefined = false,
  FreeSolo extends boolean | undefined = false,
>({
  name,
  control,
  label,
  inputProps,
  onInputChange,
  onChange,
  ...props
}: ControlledAutocompleteProps<
  T,
  Multiple,
  DisableClearable,
  FreeSolo,
  TFieldValues,
  TName
>) {
  const { field, fieldState } = useController({
    control: control,
    name: name,
  })

  const handleInputChange = useCallback(
    (_event: React.SyntheticEvent, value: string) => {
      onInputChange(value)
    },
    [onInputChange],
  )

  const handleChange = useCallback(
    (
      _event: React.SyntheticEvent,
      value: AutocompleteValue<T, Multiple, DisableClearable, FreeSolo>,
    ) => {
      onChange(value)
    },
    [onChange],
  )

  return (
    <>
      <Autocomplete
        {...props}
        {...field}
        onInputChange={handleInputChange}
        onChange={handleChange}
        renderInput={(params) => (
          <TextField
            {...params}
            label={label}
            error={!!fieldState.error}
            helperText={fieldState.error?.message}
            {...inputProps}
          />
        )}
      />
    </>
  )
}
