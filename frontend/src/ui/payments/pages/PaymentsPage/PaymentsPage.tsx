import React from "react"
import { Box, Container, Divider, Grid, Typography } from "@mui/material"
import { useSnackbar } from "../../hooks/useSnackbar"
import { PaymentList } from "../../components/PaymentList"

export function PaymentsPage() {
  const { SnackBar } = useSnackbar()

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
      <SnackBar />
    </>
  )
}
