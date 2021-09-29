import { css } from "@emotion/react"
import { InputAdornment, TextField } from "@mui/material"
import React from "react"
import { useAmountTextField } from "../../hooks/useAmountTextField"

export function AmountTextField() {
  const { amount, changeAmount } = useAmountTextField()

  function handleAmountChange(event: React.ChangeEvent<HTMLInputElement>) {
    const amount = Number(event.target.value)
    if (!isNaN(amount)) {
      changeAmount(amount)
    }
  }

  return (
    <>
      <TextField
        id={"amount-input"}
        variant={"standard"}
        label={"支払い金額"}
        css={css`
          min-width: 200px;
        `}
        value={amount}
        onChange={handleAmountChange}
        inputMode={"numeric"}
        InputProps={{
          startAdornment: <InputAdornment position={"start"}>¥</InputAdornment>,
        }}
      />
    </>
  )
}
