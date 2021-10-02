import { css } from "@emotion/react"
import { Box, Container, Divider, Typography } from "@mui/material"
import React from "react"
import { HABookAppBar } from "../../../navigation/components/organisms/HABookAppBar"
import { theme } from "../../../theme"
import { PaymentList } from "../organisms/PaymentList"

export function PaymentListTemplate() {
  return (
    <>
      <HABookAppBar />
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
    padding: ${theme.spacing(3)};
  }
`
