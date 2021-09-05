import { css } from "@emotion/react"
import { Grid } from "@material-ui/core"
import Head from "next/head"
import React from "react"
import { theme } from "../../theme"
import { TotalExpense } from "./TotalExpense"
import { TotalIncome } from "./TotalIncome"

interface HomeTemplateProps {
  totalExpense: number
  totalIncome: number
}

export function HomeTemplate({ totalExpense, totalIncome }: HomeTemplateProps) {
  return (
    <div css={wrapperStyle}>
      <Grid container spacing={2}>
        <Grid item xs>
          <TotalExpense expense={totalExpense} />
        </Grid>
        <Grid item xs>
          <TotalIncome income={totalIncome} />
        </Grid>
      </Grid>
    </div>
  )
}

const wrapperStyle = css`
  && {
    padding: ${theme.spacing(1)}px ${theme.spacing(2)}px;
  }
`
