import React from "react"
import { Box, Container, Divider, Grid, Typography } from "@mui/material"
import { useSnackbar } from "../../hooks/useSnackbar"
import { CategoriesLayout } from "../../parts/CategoriesLayout"

export function CategoriesPage() {
  const { SnackBar } = useSnackbar()

  return (
    <>
      <Container maxWidth={"md"}>
        <Box padding={3}>
          <Grid container spacing={4} direction={"column"}>
            <Grid item>
              <Typography variant={"h5"}>カテゴリー一覧</Typography>
              <Divider variant={"fullWidth"} />
            </Grid>
            <Grid item>
              <CategoriesLayout />
            </Grid>
          </Grid>
        </Box>
      </Container>
      <SnackBar />
    </>
  )
}
