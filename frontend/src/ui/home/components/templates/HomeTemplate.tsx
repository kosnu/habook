import { css } from "@emotion/react"
import { Grid } from "@mui/material"
import React from "react"
import { theme } from "../../../theme"
import { TotalExpense } from "../molecules/TotalExpense"
import { TotalIncome } from "../molecules/TotalIncome"

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
    padding: ${theme.spacing(1)} ${theme.spacing(2)};
  }
`
