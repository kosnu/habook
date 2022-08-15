import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material"
import React from "react"
import { ControllerRenderProps } from "react-hook-form"
import { PaymentFormInput } from "../../types"

interface ConsumptionTaxRateSelectProps {
  // TODO: `react-hook-form` に依存しない型定義をしたい
  consumptionTaxRateSelectProps: ControllerRenderProps<
    PaymentFormInput,
    "consumptionTaxRate"
  >
  invalid?: boolean
  errorMessage?: string
}

export function ConsumptionTaxRateSelect({
  consumptionTaxRateSelectProps,
  invalid,
  errorMessage,
}: ConsumptionTaxRateSelectProps) {
  return (
    <>
      <FormControl variant="standard" sx={{ minWidth: 100 }}>
        <InputLabel id={"consumption-tax-select-label"} />
        <Select<number>
          labelId={"consumption-tax-select-label"}
          id={"consumption-tax-select"}
          variant={"standard"}
          error={invalid}
          {...consumptionTaxRateSelectProps}
        >
          <MenuItem value={1.1}>税率(10%)</MenuItem>
          <MenuItem value={1.08}>税率(8%)</MenuItem>
          <MenuItem value={1}>税込</MenuItem>
        </Select>
        <FormHelperText>{errorMessage}</FormHelperText>
      </FormControl>
    </>
  )
}
