import { KeyboardDatePicker } from "@material-ui/pickers"
import React from "react"
import { useCreatePayment } from "../hooks/useCreatePayment"

export function PaidOnDate() {
  const { paidOnDate, onPaidOnDateChange } = useCreatePayment()
  return (
    <>
      <KeyboardDatePicker
        id="date-picker-dialog"
        label="支払日"
        format="yyyy/MM/dd"
        value={paidOnDate}
        onChange={onPaidOnDateChange}
        KeyboardButtonProps={{
          "aria-label": "change date",
          color: "primary",
        }}
      />
    </>
  )
}
