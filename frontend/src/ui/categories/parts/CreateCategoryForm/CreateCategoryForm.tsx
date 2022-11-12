import { ApolloError } from "@apollo/client"
import { zodResolver } from "@hookform/resolvers/zod"
import { Create as CreateIcon } from "@mui/icons-material"
import {
  Box,
  Button,
  CircularProgress,
  Divider,
  Grid,
  TextField,
} from "@mui/material"
import React from "react"
import { useForm } from "react-hook-form"
import { useSnackbar } from "../../hooks/useSnackbar"
import { FormSchema, formSchema, defaultValues } from "../../form"
import { useCreateCategory } from "./useCreateCategory"

export function CreateCategoryForm() {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues,
  })

  const { createCategory, loading } = useCreateCategory()
  const { openSuccessSnackBar, openWarningSnackBar } = useSnackbar()

  async function handleValid(formData: FormSchema) {
    try {
      await createCategory(formData.categoryName)
      openSuccessSnackBar("カテゴリーの作成に成功しました")
      reset()
    } catch (e) {
      console.error(e)

      if (e instanceof ApolloError) {
        openWarningSnackBar("カテゴリーの作成に失敗しました")
      }
    }
  }

  return (
    <>
      <Box component={"form"} onSubmit={handleSubmit(handleValid)}>
        <Grid container spacing={4} direction={"column"}>
          <Grid item>
            <TextField
              {...register("categoryName")}
              id={"category-name-input"}
              label={"カテゴリー名"}
              variant={"standard"}
              fullWidth
              error={Boolean(errors.categoryName)}
              helperText={errors.categoryName?.message}
            />
          </Grid>
          <Grid item>
            <Divider variant={"fullWidth"} />
          </Grid>
          <Grid item>
            {loading ? (
              <Button
                disabled
                variant={"contained"}
                color={"primary"}
                startIcon={<CircularProgress size={"1rem"} />}
              >
                カテゴリーを作成しています
              </Button>
            ) : (
              <Button
                type={"submit"}
                variant={"contained"}
                color={"primary"}
                startIcon={<CreateIcon />}
                disabled={!isValid}
              >
                カテゴリーを作成する
              </Button>
            )}
          </Grid>
        </Grid>
      </Box>
    </>
  )
}
