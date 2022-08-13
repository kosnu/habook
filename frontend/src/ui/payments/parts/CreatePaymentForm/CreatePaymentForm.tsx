import { zodResolver } from "@hookform/resolvers/zod"
import { Create as CreateIcon } from "@mui/icons-material"
import { Button, Divider, Grid } from "@mui/material"
import React, { useCallback } from "react"
import { Controller, SubmitHandler, useForm } from "react-hook-form"
import { AmountTextField } from "../AmountTextField"
import { CategorySelect } from "../CategorySelect"
import { ConsumptionTaxRateSelect } from "../ConsumptionTaxRateSelect"
import { NumberOfProductSelect } from "../NumberOfProductSelect"
import { PaidOnDatePicker } from "../PaidOnDatePicker"
import { ProductAutocomplete } from "../ProductAutocomplete"
import { schema } from "./validationSchema"

type ConsumptionTaxRate = 1.1 | 1.08 | 1

export interface CreatePaymentInput {
  paidOnDate: Date
  categoryId: string
  productName: string
  numberOfProduct: number
  consumptionTaxRate: ConsumptionTaxRate
  amount: number
}

export function CreatePaymentForm() {
  const {
    register,
    control,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<CreatePaymentInput>({
    defaultValues: {
      paidOnDate: new Date(),
      categoryId: "",
      productName: "",
      numberOfProduct: 1,
      consumptionTaxRate: 1.08,
    },
    resolver: zodResolver(schema),
  })

  function handleProductAutocompleteChange(inputValue: string) {
    setValue("productName", inputValue, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    })
  }

  // フォーム送信時の処理
  const onSubmit: SubmitHandler<CreatePaymentInput> = useCallback((data) => {
    // バリデーションチェックOK！なときに行う処理を追加
    console.log(data)
  }, [])

  return (
    <>
      <Grid
        container
        spacing={4}
        direction={"column"}
        component={"form"}
        onSubmit={handleSubmit(onSubmit)}
      >
        <Grid item>
          <Controller
            name="paidOnDate"
            control={control}
            render={({ field, fieldState }) => (
              <PaidOnDatePicker
                datePickerProps={field}
                invalid={!!fieldState.error}
                errorMessage={fieldState.error?.message}
              />
            )}
          />
        </Grid>
        <Grid item>
          <Controller
            name="categoryId"
            control={control}
            render={({ field, fieldState }) => (
              <CategorySelect
                selectProps={field}
                invalid={!!fieldState.error}
                errorMessage={fieldState.error?.message}
              />
            )}
          />
        </Grid>
        <Grid item container spacing={2}>
          <Grid item>
            <Controller
              name="productName"
              control={control}
              render={({ field, fieldState }) => (
                <ProductAutocomplete
                  autocompleteProps={field}
                  invalid={!!fieldState.error}
                  errorMessage={fieldState.error?.message}
                  onChange={handleProductAutocompleteChange}
                />
              )}
            />
          </Grid>
          <Grid item>
            <Controller
              name="numberOfProduct"
              control={control}
              render={({ field, fieldState }) => (
                <NumberOfProductSelect
                  selectProps={field}
                  invalid={!!fieldState.error}
                  errorMessage={fieldState.error?.message}
                />
              )}
            />
          </Grid>
        </Grid>
        <Grid item container spacing={2} direction={"row"}>
          <Grid item>
            <Controller
              name="consumptionTaxRate"
              control={control}
              render={({ field, fieldState }) => (
                <ConsumptionTaxRateSelect
                  consumptionTaxRateSelectProps={field}
                  invalid={!!fieldState.error}
                  errorMessage={fieldState.error?.message}
                />
              )}
            />
          </Grid>
          <Grid item>
            <AmountTextField
              textFieldProps={register("amount", {
                valueAsNumber: true,
              })}
              invalid={!!errors.amount}
              errorMessage={errors.amount?.message}
            />
          </Grid>
        </Grid>
        <Grid item>
          <Divider variant={"fullWidth"} />
        </Grid>
        <Grid item>
          <Button
            variant={"contained"}
            color={"primary"}
            startIcon={<CreateIcon />}
            onClick={handleSubmit(onSubmit)}
          >
            支払いの入力を確定する
          </Button>
        </Grid>
      </Grid>
    </>
  )
}
