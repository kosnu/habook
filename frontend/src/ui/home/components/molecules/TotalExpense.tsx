import { css } from "@emotion/react"
import { Card, CardContent, Typography } from "@mui/material"
import React from "react"

interface TotalExpenseProps {
  expense: number
}

export function TotalExpense({ expense }: TotalExpenseProps) {
  return (
    <>
      <Card>
        <CardContent css={contentWrapperStyle}>
          <Typography variant={"h4"}>支出</Typography>
          <Typography variant={"h5"}>
            {expense.toLocaleString("ja-JP", {
              style: "currency",
              currency: "JPY",
            })}
          </Typography>
        </CardContent>
      </Card>
    </>
  )
}

const contentWrapperStyle = css`
  && {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: baseline;
  }
`
