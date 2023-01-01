import React from "react"
import { Box, Container, Divider, Stack, Typography } from "@mui/material"
import { useSnackbar } from "../../hooks/useSnackbar"
import { PaymentList } from "../../components/PaymentList"

export function PaymentsPage() {
  const { SnackBar } = useSnackbar()

  return (
    <>
      <Container maxWidth={"md"}>
        <Box padding={3}>
          <Stack spacing={4} divider={<Divider flexItem />}>
            <Box>
              <Typography variant={"h5"}>支払い一覧</Typography>
            </Box>
            <Box>
              <PaymentList />
            </Box>
          </Stack>
        </Box>
      </Container>
      <SnackBar />
    </>
  )
}
