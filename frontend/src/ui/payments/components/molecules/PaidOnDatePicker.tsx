import { DatePicker } from "@mui/x-date-pickers"
import "@mui/lab"
import { TextField } from "@mui/material"

import React from "react"
import { usePaidOnDatePicker } from "../../hooks/usePaidOnDatePicker"

export function PaidOnDatePicker() {
  const { paidOnDate, changePaidOnDate } = usePaidOnDatePicker()

  return (
    <>
      <DatePicker
        label={"支払日"}
        mask={"____/__/__"}
        inputFormat={"yyyy/MM/dd"}
        value={paidOnDate}
        onChange={changePaidOnDate}
        renderInput={(params) => <TextField variant={"standard"} {...params} />}
      />
    </>
  )
}
