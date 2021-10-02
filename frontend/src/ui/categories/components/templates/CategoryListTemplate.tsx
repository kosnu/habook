import { css } from "@emotion/react"
import { Container, Divider, Grid, Typography } from "@mui/material"
import React from "react"
import { SuccessSnackBar } from "../../../common/components/molecules/SuccessSnackBar"
import { WarningSnackBar } from "../../../common/components/molecules/WarningSnackBar"
import { HABookAppBar } from "../../../navigation/components/organisms/HABookAppBar"
import { theme } from "../../../theme"
import { CategoryList } from "../organisms/CategoryList"

export function CategoryListTemplate() {
  return (
    <>
      <HABookAppBar />
      <Container css={wrapperStyle} maxWidth={"md"}>
        <Grid container spacing={4} direction={"column"}>
          <Grid item>
            <Typography variant={"h5"}>カテゴリー一覧</Typography>
            <Divider variant={"fullWidth"} />
          </Grid>
          <Grid item>
            <CategoryList />
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
