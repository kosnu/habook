import { Card, CardContent, Grid, Typography } from "@mui/material"
import React from "react"

interface TotalExpenseProps {
  expense: number
}

export function TotalExpense({ expense }: TotalExpenseProps) {
  return (
    <>
      <Card>
        <CardContent>
          <Grid
            container
            justifyContent={"space-between"}
            alignItems={"baseline"}
          >
            <Grid item>
              <Typography variant={"h4"}>支出</Typography>
            </Grid>
            <Grid item>
              <Typography variant={"h5"}>
                {expense.toLocaleString("ja-JP", {
                  style: "currency",
                  currency: "JPY",
                })}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </>
  )
}
