import { ApolloError } from "@apollo/client"
import { css } from "@emotion/react"
import { zodResolver } from "@hookform/resolvers/zod"
import { Grid, TextField } from "@mui/material"
import React, { useCallback } from "react"
import { Controller, SubmitHandler, useForm } from "react-hook-form"
import { useSuccessSnackbar } from "../../../common/components/SuccessSnackBar"
import { useWarningSnackbar } from "../../../common/components/WarningSnackBar"
import { Payment, PaymentFormInput } from "../../types"
import { AmountTextField } from "../AmountTextField"
import { CategorySelect } from "../CategorySelect"
import { ConsumptionTaxRateSelect } from "../ConsumptionTaxRateSelect"
import { schema } from "../CreatePaymentForm/validationSchema"
import { NumberOfProductSelect } from "../NumberOfProductSelect"
import { PaidOnDatePicker } from "../PaidOnDatePicker"

interface UpdatePaymentFormInput {
  payment: Payment
}

export function UpdatePaymentForm({ payment }: UpdatePaymentFormInput) {
  const defaultValues: Omit<PaymentFormInput, "productName"> = {
    paidOnDate: new Date(payment.paidOn),
    categoryId: payment.category.id,
    numberOfProduct: payment.numberOfProduct,
    consumptionTaxRate: 1.08,
    amount: payment.amount,
  }
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<PaymentFormInput>({
    defaultValues: defaultValues,
    resolver: zodResolver(schema),
  })
  const { openSuccessSnackbar } = useSuccessSnackbar()
  const { openWarningSnackbar } = useWarningSnackbar()

  // フォーム送信時の処理
  const onSubmit: SubmitHandler<PaymentFormInput> = useCallback(
    async (data) => {
      try {
        console.log(data)
        openSuccessSnackbar("支払いの変更ができました")
        reset({ ...defaultValues })
      } catch (e) {
        console.error(e)
        if (e instanceof ApolloError) {
          openWarningSnackbar(e.message)
        }
      }
    },
    [openSuccessSnackbar, openWarningSnackbar, reset],
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
            <TextField
              variant={"standard"}
              css={css`
                width: 400px;
              `}
              label={"商品名"}
              defaultValue={payment.product.name}
              InputProps={{
                readOnly: true,
              }}
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
      </Grid>
    </>
  )
}
