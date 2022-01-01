import { Grid } from "@mui/material"
import React from "react"
import { TotalExpense } from "../TotalExpense"
import { TotalIncome } from "../TotalIncome"

export function DashboardLayout() {
  const totalExpense = 123456
  const totalIncome = 123456

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs>
          <TotalExpense expense={totalExpense} />
        </Grid>
        <Grid item xs>
          <TotalIncome income={totalIncome} />
        </Grid>
      </Grid>
    </>
  )
}
