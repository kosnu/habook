import { Box, Container, Divider, Grid, Typography } from "@mui/material"
import React from "react"
import { CreatePaymentForm } from "../../parts/CreatePaymentForm"

export function NewPaymentPage() {
  return (
    <>
      <Container maxWidth={"md"}>
        <Box padding={3}>
          <Grid container spacing={4} direction={"column"}>
            <Grid item>
              <Typography variant={"h5"}>新しい支払いの作成</Typography>
              <Divider variant={"fullWidth"} />
            </Grid>
            <Grid item>
              <CreatePaymentForm />
            </Grid>
          </Grid>
        </Box>
      </Container>
    </>
  )
}
