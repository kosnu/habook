import { DatePicker } from "@mui/lab"
import { TextField } from "@mui/material"

import React from "react"
import { useCreatePayment } from "../hooks/useCreatePayment"

export function PaidOnDate() {
  const { paidOnDate, onPaidOnDateChange } = useCreatePayment()

  return (
    <>
      <DatePicker
        label="支払日"
        inputFormat={"yyyy/MM/dd"}
        value={paidOnDate}
        onChange={onPaidOnDateChange}
        renderInput={(params) => <TextField variant={"standard"} {...params} />}
      />
    </>
  )
}
