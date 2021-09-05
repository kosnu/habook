import { css } from "@emotion/react"
import { Container, Divider, Typography } from "@material-ui/core"
import React from "react"
import { theme } from "../../../theme"
import { CategoryList } from "./CategoryList"

export function CategoryListTemplate() {
  return (
    <>
      <Container css={wrapperStyle} maxWidth={"md"}>
        <Typography variant={"h5"}>カテゴリー一覧</Typography>
        <Divider variant={"fullWidth"} />
        <CategoryList />
      </Container>
    </>
  )
}

const wrapperStyle = css`
  && {
    padding: ${theme.spacing(3)}px;
  }
`
