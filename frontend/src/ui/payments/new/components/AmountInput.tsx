import { css } from "@emotion/react"
import {
  FormControl,
  Grid,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@material-ui/core"
import React, { useCallback } from "react"
import { useCreatePayment } from "../hooks/useCreatePayment"

export function AmountInput() {
  const {
    amount,
    taxIncluded,
    numberOfProduct,
    onAmountChange,
    onTaxIncludedSelect,
    onNumberOfProductSelect,
  } = useCreatePayment()

  const handleAmountChange = useCallback(
    (event) => {
      const amount: number = event.target.value
      if (!isNaN(amount)) {
        onAmountChange(Number(amount))
      }
    },
    [onAmountChange],
  )

  const handleTaxIncludedSelect = useCallback(
    (event) => {
      onTaxIncludedSelect(event.target.value)
    },
    [onTaxIncludedSelect],
  )

  const handleNumberOfProductChange = useCallback(
    (event) => {
      onNumberOfProductSelect(event.target.value)
    },
    [onNumberOfProductSelect],
  )

  return (
    <>
      <Grid container spacing={2} direction={"row"}>
        <Grid item>
          <FormControl>
            <InputLabel id="fee-select-label">{""}</InputLabel>
            <Select
              labelId="fee-select-label"
              id="fee-select"
              value={taxIncluded}
              onChange={handleTaxIncludedSelect}
            >
              <MenuItem value={1}>税込</MenuItem>
              <MenuItem value={0}>税抜</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item>
          <TextField
            id="amount-input"
            label="支払い金額"
            css={wrapperFormStyle}
            value={amount}
            onChange={handleAmountChange}
            inputMode={"numeric"}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">¥</InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item>
          <FormControl>
            <InputLabel id="number-select-label">個数</InputLabel>
            <Select
              labelId="number-select-label"
              id="number-select"
              value={numberOfProduct}
              onChange={handleNumberOfProductChange}
            >
              {Array.from(Array(10).keys()).map((num, index) => {
                const valueNumber = num + 1
                return (
                  <MenuItem key={index} value={valueNumber}>
                    {valueNumber}
                  </MenuItem>
                )
              })}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
    </>
  )
}

const wrapperFormStyle = css`
  && {
    min-width: 200px;
    width: 200px;
  }
`
