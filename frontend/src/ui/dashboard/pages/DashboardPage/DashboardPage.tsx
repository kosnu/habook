import { Box, Container } from "@mui/material"
import React from "react"
import { DashboardLayout } from "../../parts/DashboardLayout"

export function DashboardPage() {
  return (
    <>
      <>
        <Container maxWidth={"xl"}>
          <Box padding={3}>
            <DashboardLayout />
          </Box>
        </Container>
      </>
    </>
  )
}
