import { Grid } from "@mui/material"
import React from "react"
import { usePayment } from "../../hooks/usePayment"
import { ReadOnlyProductNameForm } from "../atoms/ReadOnlyProductNameForm"
import { AmountForm } from "../molecules/AmountForm"
import { CategorySelect } from "../molecules/CategorySelect"
import { NumberOfProductSelect } from "../molecules/NumberOfProductSelect"
import { PaidOnDate } from "../molecules/PaidOnDate"

export function UpdatePaymentForm() {
  const { selectedPayment } = usePayment()

  return (
    <>
      <Grid container spacing={4} direction={"column"}>
        <Grid item>
          <PaidOnDate />
        </Grid>
        <Grid item>
          <CategorySelect />
        </Grid>
        <Grid item container spacing={2} direction={"row"}>
          <Grid item>
            <ReadOnlyProductNameForm
              productName={selectedPayment?.product.name ?? ""}
            />
          </Grid>
          <Grid item>
            <NumberOfProductSelect />
          </Grid>
        </Grid>
        <Grid item>
          <AmountForm />
        </Grid>
      </Grid>
    </>
  )
}
