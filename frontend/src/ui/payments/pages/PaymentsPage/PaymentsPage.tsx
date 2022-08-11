import { Box, Container, Divider, Grid, Typography } from "@mui/material"
import React from "react"
import { PaymentList } from "../../components/organisms/PaymentList"

export function PaymentsPage() {
  return (
    <>
      <Container maxWidth={"md"}>
        <Box padding={3}>
          <Grid container spacing={4} direction={"column"}>
            <Grid item>
              <Typography variant={"h5"}>支払い一覧</Typography>
              <Divider variant={"fullWidth"} />
            </Grid>
          </Grid>
          <Grid item>
            <PaymentList />
          </Grid>
        </Box>
      </Container>
    </>
  )
}
