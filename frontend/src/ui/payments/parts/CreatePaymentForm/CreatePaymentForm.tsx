import { ApolloError } from "@apollo/client"
import { zodResolver } from "@hookform/resolvers/zod"
import { Create as CreateIcon } from "@mui/icons-material"
import { Button, Divider, Grid } from "@mui/material"
import React, { useCallback } from "react"
import { Controller, SubmitHandler, useForm } from "react-hook-form"
import { useSnackbar } from "~/ui/payments/hooks/useSnackbar"
import { PaymentFormInput } from "../../types"
import { AmountTextField } from "../AmountTextField"
import { CategorySelect } from "../CategorySelect"
import { ConsumptionTaxRateSelect } from "../ConsumptionTaxRateSelect"
import { NumberOfProductSelect } from "../NumberOfProductSelect"
import { PaidOnDatePicker } from "../PaidOnDatePicker"
import { ProductAutocomplete } from "../ProductAutocomplete"
import { useCreatePayment } from "./useCreatePayment"
import { schema } from "~/ui/payments/validationSchema"

const defaultValues: Partial<PaymentFormInput> = {
  paidOnDate: new Date(),
  categoryId: "",
  productName: "",
  numberOfProduct: 1,
  consumptionTaxRate: 1.08,
  amount: null,
}

export function CreatePaymentForm() {
  const {
    register,
    control,
    setValue,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<PaymentFormInput>({
    defaultValues: defaultValues,
    resolver: zodResolver(schema),
  })
  const { createPayment } = useCreatePayment()
  const { openSuccessSnackBar, openWarningSnackBar } = useSnackbar()

  const handleProductAutocompleteChange = useCallback(
    (productName: string) => {
      setValue("productName", productName)
    },
    [setValue],
  )

  const handleProductAutocompleteInputChange = useCallback(
    (inputValue: string) => {
      setValue("productName", inputValue)
    },
    [setValue],
  )

  // フォーム送信時の処理
  const onSubmit: SubmitHandler<PaymentFormInput> = useCallback(
    async (data) => {
      try {
        await createPayment(data)
        openSuccessSnackBar("支払いが作成できました")
        reset({ ...defaultValues })
      } catch (e) {
        console.error(e)
        if (e instanceof ApolloError) {
          openWarningSnackBar("支払いが作成に失敗しました")
        }
      }
    },
    [createPayment, openSuccessSnackBar, openWarningSnackBar, reset],
  )

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
                  onInputChange={handleProductAutocompleteInputChange}
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
