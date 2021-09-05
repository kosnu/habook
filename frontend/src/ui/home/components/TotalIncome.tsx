import { css } from "@emotion/react"
import { Card, CardContent, Typography } from "@material-ui/core"
import React from "react"

interface TotalIncomeProps {
  income: number
}

export function TotalIncome({ income }: TotalIncomeProps) {
  return (
    <>
      <Card>
        <CardContent css={contentWrapperStyle}>
          <Typography variant={"h4"}>収入</Typography>
          <Typography variant={"h5"}>
            {income.toLocaleString("ja-JP", {
              style: "currency",
              currency: "JPY",
            })}
          </Typography>
        </CardContent>
      </Card>{" "}
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
