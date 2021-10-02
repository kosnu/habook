import { css } from "@emotion/react"
import { Create as CreateIcon } from "@mui/icons-material"
import { Button, Container, Divider, Grid, Typography } from "@mui/material"
import React from "react"
import { SuccessSnackBar } from "../../../common/components/molecules/SuccessSnackBar"
import { WarningSnackBar } from "../../../common/components/molecules/WarningSnackBar"
import { HABookAppBar } from "../../../navigation/components/organisms/HABookAppBar"
import { theme } from "../../../theme"
import { useCreateCategoryForm } from "../../hooks/useCreateCategoryForm"
import { CreateCategoryForm } from "../organisms/CreateCategoryForm"

export function NewCategoryTemplate() {
  const { invalid, validateCreateForm, createCategory } =
    useCreateCategoryForm()

  async function handleCreateButtonClick() {
    validateCreateForm()
    await createCategory()
  }

  return (
    <>
      <HABookAppBar />
      <Container css={wrapperStyle} maxWidth={"md"}>
        <Grid container spacing={4} direction={"column"}>
          <Grid item>
            <Typography variant={"h5"}>新しいカテゴリーの作成</Typography>
            <Divider variant={"fullWidth"} />
          </Grid>
          <Grid item>
            <CreateCategoryForm />
          </Grid>
          <Grid item>
            <Divider variant={"fullWidth"} />
          </Grid>
          <Grid item>
            <Button
              variant={"contained"}
              color={"primary"}
              startIcon={<CreateIcon />}
              disabled={invalid}
              onClick={handleCreateButtonClick}
            >
              カテゴリーの作成を確定する
            </Button>
          </Grid>
        </Grid>
      </Container>
      <SuccessSnackBar />
      <WarningSnackBar />
    </>
  )
}

const wrapperStyle = css`
  && {
    padding: ${theme.spacing(3)};
  }
`
