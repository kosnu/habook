import React, { useCallback } from "react"
import { ApolloError } from "@apollo/client"
import { zodResolver } from "@hookform/resolvers/zod"
import { Create as CreateIcon } from "@mui/icons-material"
import { Button, Divider, Grid, InputAdornment, MenuItem } from "@mui/material"
import { useForm } from "react-hook-form"
import {
  ControlledAutocomplete,
  ControlledDatePicker,
  ControlledSelect,
  ControlledTextField,
} from "~/ui/common/components"
import { useSnackbar, useCategories, useProducts } from "../../hooks"
import { defaultValues, FormSchema, formSchema } from "./form"
import { useCreatePayment } from "./useCreatePayment"

export function CreatePaymentForm() {
  const { control, setValue, handleSubmit, reset } = useForm<FormSchema>({
    defaultValues: defaultValues,
    resolver: zodResolver(formSchema),
  })
  const { categories } = useCategories()
  const { products, loading: loadingProducts } = useProducts()
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

  const handleValid = useCallback(
    async (data: FormSchema) => {
      try {
        await createPayment(data)
        openSuccessSnackBar("支払いが作成できました")
        reset()
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
            <ControlledAutocomplete
              control={control}
              name={"productName"}
              label={"商品名"}
              freeSolo
              options={products}
              loading={loadingProducts}
              getOptionLabel={(option) =>
                typeof option === "string" ? option : option.name
              }
              isOptionEqualToValue={(option, value) => {
                if (typeof option === "string") return false

                return option.id === value.id
              }}
              inputProps={{ variant: "standard", sx: { minWidth: "400px" } }}
              onChange={(value) => {
                if (typeof value === "string" || !value) return

                handleProductAutocompleteChange(value.name)
              }}
              onInputChange={(inputValue: string) => {
                handleProductAutocompleteInputChange(inputValue)
              }}
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
            <ControlledSelect
              control={control}
              name={"consumptionTaxRate"}
              sx={{ minWidth: "120px" }}
            >
              <MenuItem value={1.1}>税率(10%)</MenuItem>
              <MenuItem value={1.08}>税率(8%)</MenuItem>
              <MenuItem value={1}>税込</MenuItem>
            </ControlledSelect>
          </Grid>
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
        </Grid>
        <Grid item>
          <Divider variant={"fullWidth"} />
        </Grid>
        <Grid item>
          <Button
            type={"submit"}
            variant={"contained"}
            color={"primary"}
            startIcon={<CreateIcon />}
          >
            支払いの入力を確定する
          </Button>
        </Grid>
      </Grid>
    </>
  )
}
