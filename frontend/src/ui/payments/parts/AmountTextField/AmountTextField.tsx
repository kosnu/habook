import { css } from "@emotion/react"
import { InputAdornment, TextField } from "@mui/material"
import { TextFieldProps } from "@mui/material/TextField/TextField"
import React from "react"

interface AmountTextFieldProps {
  textFieldProps: TextFieldProps
  invalid?: boolean
  errorMessage?: string
}

export function AmountTextField({
  textFieldProps,
  invalid,
  errorMessage,
}: AmountTextFieldProps) {
  return (
    <>
      <TextField
        {...textFieldProps}
        variant={"standard"}
        label={"支払い金額"}
        css={css`
          min-width: 200px;
        `}
        type={"number"}
        error={invalid}
        helperText={errorMessage}
        inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
        InputProps={{
          startAdornment: <InputAdornment position={"start"}>¥</InputAdornment>,
        }}
      />
    </>
  )
}
