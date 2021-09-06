import { css } from "@emotion/react"
import { Box, Container, Divider, Typography } from "@material-ui/core"
import React from "react"
import { theme } from "../../../theme"
import { PaymentList } from "./PaymentList"

export function PaymentListTemplate() {
  return (
    <>
      <Container css={wrapperStyle} maxWidth={"md"}>
        <Typography variant={"h5"}>支払い一覧</Typography>
        <Divider variant={"fullWidth"} />
        <Box height={16} />
        <PaymentList />
      </Container>
    </>
  )
}

const wrapperStyle = css`
  && {
    padding: ${theme.spacing(3)}px;
  }
`
