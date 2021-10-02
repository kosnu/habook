import { TextField } from "@mui/material"
import React from "react"

export function PasswordTextField() {
  return (
    <>
      <TextField
        fullWidth
        variant={"standard"}
        type={"password"}
        label={"パスワード"}
      />
    </>
  )
}
