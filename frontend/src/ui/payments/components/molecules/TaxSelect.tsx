import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material"
import React from "react"
import { useTaxSelect } from "../../hooks/useTaxSelect"

export function TaxSelect() {
  const { taxIncluded, changeTaxIncluded } = useTaxSelect()

  function handleTaxIncludedSelect(event: SelectChangeEvent) {
    const value = Boolean(event.target.value)
    changeTaxIncluded(value)
  }

  return (
    <>
      <FormControl variant="standard" sx={{ minWidth: 100 }}>
        <InputLabel id={"fee-select-label"}>{""}</InputLabel>
        <Select
          labelId={"fee-select-label"}
          id={"fee-select"}
          variant={"standard"}
          value={Number(taxIncluded).toString()}
          onChange={handleTaxIncludedSelect}
        >
          <MenuItem value={1}>税込</MenuItem>
          <MenuItem value={0}>税抜</MenuItem>
        </Select>
      </FormControl>
    </>
  )
}
