import { Divider, Grid } from "@mui/material"
import React from "react"
import { useCreatePaymentForm } from "../../hooks/useCreatePaymentForm"
import { AmountTextField } from "../molecules/AmountTextField"
import { CategorySelect } from "../molecules/CategorySelect"
import { CreatePaymentButton } from "../molecules/CreatePaymentButton"
import { NumberOfProductSelect } from "../molecules/NumberOfProductSelect"
import { PaidOnDatePicker } from "../molecules/PaidOnDatePicker"
import { ProductNameAutocomplete } from "../molecules/ProductNameAutocomplete"
import { TaxSelect } from "../molecules/TaxSelect"

export function CreatePaymentForm() {
  const { invalid, createPayment, validateCreateForm } = useCreatePaymentForm()

  async function handleCreateButtonClick() {
    validateCreateForm()
    await createPayment()
  }

  return (
    <>
      <Grid container spacing={4} direction={"column"}>
        <Grid item>
          <PaidOnDatePicker />
        </Grid>
        <Grid item>
          <CategorySelect />
        </Grid>
        <Grid item container spacing={2}>
          <Grid item>
            <ProductNameAutocomplete />
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
        <Grid item>
          <Divider variant={"fullWidth"} />
        </Grid>
        <Grid item>
          <CreatePaymentButton
            invalid={invalid}
            onClick={handleCreateButtonClick}
          />
        </Grid>
      </Grid>
    </>
  )
}
