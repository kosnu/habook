import { ApolloError } from "@apollo/client"
import { css } from "@emotion/react"
import { zodResolver } from "@hookform/resolvers/zod"
import { Create as CreateIcon } from "@mui/icons-material"
import { Button, Divider, Grid, TextField } from "@mui/material"
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
import { useUpdatePayment } from "../PaymentItem/useUpdatePayment"

interface UpdatePaymentFormInput {
  payment: Payment
  onModalClose: () => void
}

export function UpdatePaymentForm({
  payment,
  onModalClose,
}: UpdatePaymentFormInput) {
  const defaultValues: PaymentFormInput = {
    paidOnDate: new Date(payment.paidOn),
    categoryId: payment.category.id,
    productName: payment.product.name,
    numberOfProduct: payment.numberOfProduct,
    consumptionTaxRate: 1.08,
    amount: payment.amount,
  }
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<PaymentFormInput>({
    defaultValues: defaultValues,
    resolver: zodResolver(schema),
  })
  const { updatePayment } = useUpdatePayment()
  const { openSuccessSnackbar } = useSuccessSnackbar()
  const { openWarningSnackbar } = useWarningSnackbar()

  const handleModalClose = useCallback(() => {
    onModalClose()
  }, [onModalClose])

  // フォーム送信時の処理
  const onSubmit: SubmitHandler<PaymentFormInput> = useCallback(
    async (data) => {
      try {
        await updatePayment(payment.id, data)
        openSuccessSnackbar("支払いの変更ができました")
        onModalClose()
      } catch (e) {
        console.error(e)
        if (e instanceof ApolloError) {
          openWarningSnackbar(e.message)
        }
      }
    },
    [
      updatePayment,
      openSuccessSnackbar,
      openWarningSnackbar,
      payment,
      onModalClose,
    ],
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
              disabled
              variant={"standard"}
              css={css`
                width: 400px;
              `}
              label={"商品名"}
              defaultValue={payment.product.name}
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
          <Grid item>
            <Divider variant={"fullWidth"} />
          </Grid>
          <Grid
            container
            item
            spacing={2}
            direction={"row"}
            justifyContent={"end"}
          >
            <Grid item>
              <Button onClick={handleModalClose} color={"primary"}>
                キャンセル
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant={"contained"}
                color={"primary"}
                startIcon={<CreateIcon />}
                onClick={handleSubmit(onSubmit)}
              >
                支払いを更新する
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  )
}
