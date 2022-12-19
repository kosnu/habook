import React from "react"
import { Card, CardContent, Grid, Typography } from "@mui/material"

interface TotalIncomeProps {
  income: number
}

export function TotalIncome({ income }: TotalIncomeProps) {
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
              <Typography variant={"h4"}>収入</Typography>
            </Grid>
            <Grid item>
              <Typography variant={"h5"}>
                {income.toLocaleString("ja-JP", {
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
