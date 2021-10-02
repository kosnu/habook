import { TextField } from "@mui/material"
import React from "react"

export function EMailTextField() {
  return (
    <>
      <TextField
        fullWidth
        variant={"standard"}
        type={"email"}
        label={"メールアドレス"}
        placeholder={"example@kosnu.dev"}
      />
    </>
  )
}
