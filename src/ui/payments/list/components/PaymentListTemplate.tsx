import { css } from "@emotion/react"
import { Container, Divider, Typography } from "@material-ui/core"
import React from "react"
import { theme } from "../../../theme"

export function PaymentListTemplate() {
  return (
    <>
      <Container css={wrapperStyle} maxWidth={"md"}>
        <Typography variant={"h5"}>支払い一覧</Typography>
        <Divider variant={"fullWidth"} />
      </Container>
    </>
  )
}

const wrapperStyle = css`
  && {
    padding: ${theme.spacing(3)}px;
  }
`
