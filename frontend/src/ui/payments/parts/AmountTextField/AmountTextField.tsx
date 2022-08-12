import { css } from "@emotion/react"
import { InputAdornment, TextField } from "@mui/material"
import { TextFieldProps } from "@mui/material/TextField/TextField"
import React from "react"

interface AmountTextFieldProps {
  textFieldProps: TextFieldProps
}

export function AmountTextField({ textFieldProps }: AmountTextFieldProps) {
  return (
    <>
      <TextField
        variant={"standard"}
        label={"支払い金額"}
        css={css`
          min-width: 200px;
        `}
        inputMode={"numeric"}
        InputProps={{
          startAdornment: <InputAdornment position={"start"}>¥</InputAdornment>,
        }}
        {...textFieldProps}
      />
    </>
  )
}
