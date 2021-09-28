import { css } from "@emotion/react"
import {
  FormControl,
  Grid,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material"
import React from "react"
import { useAmountForm } from "../../hooks/useAmountForm"

export function AmountForm() {
  const {
    taxIncluded,
    amount,
    numberOfProduct,
    changeTaxIncluded,
    changeAmount,
    changeNumberOfProduct,
  } = useAmountForm()

  function handleTaxIncludedSelect(event: SelectChangeEvent) {
    const value = Boolean(parseInt(event.target.value))
    changeTaxIncluded(value)
  }

  function handleAmountChange(event: React.ChangeEvent<HTMLInputElement>) {
    const amount = Number(event.target.value)
    if (!isNaN(amount)) {
      changeAmount(amount)
    }
  }

  function handleNumberOfProductChange(event: SelectChangeEvent) {
    const value = Number(event.target.value)
    changeNumberOfProduct(value)
  }

  return (
    <>
      <Grid container spacing={2} direction={"column"}>
        <Grid container item spacing={2} direction={"row"}>
          <Grid item>
            <FormControl variant="standard" sx={{ minWidth: 100 }}>
              <InputLabel id={"fee-select-label"}>{""}</InputLabel>
              <Select
                labelId={"fee-select-label"}
                id={"fee-select"}
                variant={"standard"}
                value={Number(taxIncluded).toString()}
                onChange={handleTaxIncludedSelect}
              >
                <MenuItem value={"1"}>税込</MenuItem>
                <MenuItem value={"0"}>税抜</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs>
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
                startAdornment: (
                  <InputAdornment position={"start"}>¥</InputAdornment>
                ),
              }}
            />
          </Grid>
        </Grid>
        <Grid item>
          <FormControl variant="standard" sx={{ minWidth: 100 }}>
            <InputLabel id={"number-select-label"}>個数</InputLabel>
            <Select
              labelId={"number-select-label"}
              id={"number-select"}
              variant={"standard"}
              value={numberOfProduct.toString()}
              onChange={handleNumberOfProductChange}
            >
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num, index) => {
                const value = num.toString()

                return (
                  <MenuItem key={index} value={value}>
                    {value}
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
