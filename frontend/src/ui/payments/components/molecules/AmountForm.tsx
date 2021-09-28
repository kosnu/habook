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
  const { taxIncluded, amount, changeTaxIncluded, changeAmount } =
    useAmountForm()

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

  return (
    <>
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
    </>
  )
}
