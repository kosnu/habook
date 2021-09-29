import { Grid } from "@mui/material"
import React from "react"
import { usePayment } from "../../hooks/usePayment"
import { ReadOnlyProductNameTextField } from "../atoms/ReadOnlyProductNameTextField"
import { AmountTextField } from "../molecules/AmountTextField"
import { CategorySelect } from "../molecules/CategorySelect"
import { NumberOfProductSelect } from "../molecules/NumberOfProductSelect"
import { PaidOnDatePicker } from "../molecules/PaidOnDatePicker"
import { TaxSelect } from "../molecules/TaxSelect"

export function UpdatePaymentForm() {
  const { selectedPayment } = usePayment()

  return (
    <>
      <Grid container spacing={4} direction={"column"}>
        <Grid item>
          <PaidOnDatePicker />
        </Grid>
        <Grid item>
          <CategorySelect />
        </Grid>
        <Grid item container spacing={2} direction={"row"}>
          <Grid item>
            <ReadOnlyProductNameTextField
              productName={selectedPayment?.product.name ?? ""}
            />
          </Grid>
          <Grid item>
            <NumberOfProductSelect />
          </Grid>
        </Grid>
        <Grid item container spacing={2} direction={"row"}>
          <Grid item>
            <TaxSelect />
          </Grid>
          <Grid item>
            <AmountTextField />
          </Grid>
        </Grid>
      </Grid>
    </>
  )
}
