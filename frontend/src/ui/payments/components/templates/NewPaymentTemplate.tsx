import { css } from "@emotion/react"
import { Container, Divider, Grid, Typography } from "@mui/material"
import React from "react"
import { SuccessSnackBar } from "../../../common/components/molecules/SuccessSnackBar"
import { WarningSnackBar } from "../../../common/components/molecules/WarningSnackBar"
import { theme } from "../../../theme"
import { CreatePaymentForm } from "../organisms/CreatePaymentForm"

export function NewPaymentTemplate() {
  return (
    <>
      <Container css={wrapperStyle} maxWidth={"md"}>
        <Grid container spacing={4} direction={"column"}>
          <Grid item>
            <Typography variant={"h5"}>新しい支払いの作成</Typography>
            <Divider variant={"fullWidth"} />
          </Grid>
          <Grid item>
            <CreatePaymentForm />
          </Grid>
        </Grid>
      </Container>
      <SuccessSnackBar />
      <WarningSnackBar />
    </>
  )
}

const wrapperStyle = css`
  && {
    padding: ${theme.spacing(3)};
  }
`
