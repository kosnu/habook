import { DatePicker } from "@mui/lab"
import { TextField } from "@mui/material"

import React from "react"
import { usePaidOnDate } from "../../hooks/usePaidOnDate"

export function PaidOnDate() {
  const { paidOnDate, changePaidOnDate } = usePaidOnDate()

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
