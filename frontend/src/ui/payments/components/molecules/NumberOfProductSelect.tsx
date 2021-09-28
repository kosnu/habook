import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material"
import React from "react"
import { useNumberOfProduct } from "../../hooks/useNumberOfProduct"

export function NumberOfProductSelect() {
  const { numberOfProduct, changeNumberOfProduct } = useNumberOfProduct()

  function handleNumberOfProductChange(event: SelectChangeEvent) {
    const value = Number(event.target.value)
    changeNumberOfProduct(value)
  }

  return (
    <>
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
    </>
  )
}
