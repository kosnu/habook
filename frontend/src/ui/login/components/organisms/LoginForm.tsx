import { Grid } from "@mui/material"
import React from "react"
import { EMailTextField } from "../molecules/EMailTextField"
import { LogInButton } from "../molecules/LogInButton"
import { PasswordTextField } from "../molecules/PasswordTextField"

export function LoginForm() {
  return (
    <>
      <Grid container spacing={6} direction={"column"}>
        <Grid item>
          <EMailTextField />
        </Grid>
        <Grid item>
          <PasswordTextField />
        </Grid>
        <Grid item>
          <LogInButton />
        </Grid>
      </Grid>
    </>
  )
}
