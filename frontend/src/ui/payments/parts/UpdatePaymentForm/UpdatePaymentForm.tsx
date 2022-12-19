import React, { useCallback } from "react"
import { ApolloError } from "@apollo/client"
import { zodResolver } from "@hookform/resolvers/zod"
import { Create as CreateIcon } from "@mui/icons-material"
import { Button, Divider, Grid, InputAdornment, MenuItem } from "@mui/material"
import { useForm } from "react-hook-form"
import {
  ControlledDatePicker,
  ControlledSelect,
  ControlledTextField,
} from "~/ui/common/components"
import { useSnackbar, useCategories } from "../../hooks"
import { Payment } from "../../types"
import { FormSchema, formSchema } from "./form"
import { useUpdatePayment } from "./useUpdatePayment"

interface UpdatePaymentFormInput {
  payment: Payment
  onModalClose: () => void
}

export function UpdatePaymentForm({
  payment,
  onModalClose,
}: UpdatePaymentFormInput) {
  const defaultValues: FormSchema = {
    paymentId: payment.id,
    paidOnDate: new Date(payment.paidOn),
    categoryId: payment.category.id,
    productName: payment.product.name,
    numberOfProduct: payment.numberOfProduct,
    amount: payment.amount,
  }
  const { control, handleSubmit } = useForm<FormSchema>({
    defaultValues: defaultValues,
    resolver: zodResolver(formSchema),
  })
  const { categories } = useCategories()
  const { updatePayment } = useUpdatePayment()
  const { openSuccessSnackBar, openWarningSnackBar } = useSnackbar()

  const handleModalClose = useCallback(() => {
    onModalClose()
  }, [onModalClose])

  // フォーム送信時の処理
  const handleValid = useCallback(
    async (data: FormSchema) => {
      try {
        await updatePayment(
          data.paymentId,
          data.paidOnDate,
          data.categoryId,
          data.numberOfProduct,
          data.amount,
        )
        openSuccessSnackBar("支払いの変更ができました")
        onModalClose()
      } catch (e) {
        console.error(e)
        if (e instanceof ApolloError) {
          openWarningSnackBar("支払いの変更に失敗しました")
        }
      }
    },
    [updatePayment, openSuccessSnackBar, onModalClose, openWarningSnackBar],
  )

  return (
    <>
      <Grid
        container
        spacing={4}
        direction={"column"}
        component={"form"}
        onSubmit={handleSubmit(handleValid)}
      >
        <Grid item>
          <ControlledDatePicker
            control={control}
            name={"paidOnDate"}
            label={"支払日"}
            inputProps={{ variant: "standard" }}
          />
        </Grid>
        <Grid item>
          <ControlledSelect
            control={control}
            name={"categoryId"}
            label={"カテゴリー"}
            sx={{ minWidth: "200px" }}
          >
            <MenuItem value={""}>
              {categories.length >= 0 ? "未選択" : "選択肢がありません"}
            </MenuItem>
            {categories.map((category) => {
              return (
                <MenuItem key={category.id} value={category.id}>
                  {category.name}
                </MenuItem>
              )
            })}
          </ControlledSelect>
        </Grid>
        <Grid item container spacing={2}>
          <Grid item>
            <ControlledTextField
              control={control}
              name={"productName"}
              label={"商品名"}
              disabled
              sx={{ width: "400px" }}
            />
          </Grid>
          <Grid item>
            <ControlledTextField
              control={control}
              name={"numberOfProduct"}
              label={"個数"}
              sx={{ width: "64px" }}
              type={"number"}
              inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
            />
          </Grid>
        </Grid>
        <Grid item container spacing={2} direction={"row"}>
          <Grid item>
            <ControlledTextField
              control={control}
              name={"amount"}
              label={"支払い金額"}
              sx={{ minWidth: "200px" }}
              type={"number"}
              inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position={"start"}>¥</InputAdornment>
                ),
              }}
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
                type={"submit"}
                variant={"contained"}
                color={"primary"}
                startIcon={<CreateIcon />}
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
