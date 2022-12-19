import React from "react"
import { Box, Container, Divider, Grid, Typography } from "@mui/material"
import { useSnackbar } from "../../hooks/useSnackbar"
import { CreateCategoryForm } from "../../parts/CreateCategoryForm"

export function CreateCategoryPage() {
  const { SnackBar } = useSnackbar()

  return (
    <>
      <Container maxWidth={"md"}>
        <Box padding={3}>
          <Grid container spacing={4} direction={"column"}>
            <Grid item>
              <Typography variant={"h5"}>新しいカテゴリーの作成</Typography>
              <Divider variant={"fullWidth"} />
            </Grid>
            <Grid item>
              <CreateCategoryForm />
            </Grid>
          </Grid>
        </Box>
      </Container>
      <SnackBar />
    </>
  )
}
