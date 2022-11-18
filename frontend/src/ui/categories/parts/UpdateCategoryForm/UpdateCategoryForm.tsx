import { ApolloError } from "@apollo/client"
import { zodResolver } from "@hookform/resolvers/zod"
import { Create as CreateIcon } from "@mui/icons-material"
import { Box, Button, Divider, Grid, TextField } from "@mui/material"
import React, { useCallback } from "react"
import { useForm } from "react-hook-form"
import { LoadingButton } from "~/ui/common/components/LoadingButton"
import { Category } from "../../types"
import { useSnackbar } from "../../hooks/useSnackbar"
import { formSchema, FormSchema } from "../../updateForm"
import { useUpdateCategory } from "../UpdateCategoryModal/useUpdateCategory"

interface UpdateCategoryFormProps {
  category: Category
  onModalClose: () => void
}

export function UpdateCategoryForm({
  category,
  onModalClose,
}: UpdateCategoryFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      categoryId: category.id,
      categoryName: category.name,
    },
  })
  const { updateCategory, loading } = useUpdateCategory()
  const { openSuccessSnackBar, openWarningSnackBar } = useSnackbar()

  const handleValid = useCallback(
    async (formData: FormSchema) => {
      try {
        await updateCategory(formData.categoryName, formData.categoryId)
        openSuccessSnackBar("カテゴリーの更新に成功しました")
      } catch (e) {
        console.error(e)

        if (e instanceof ApolloError) {
          openWarningSnackBar("カテゴリーの更新に失敗しました")
        }
      }
    },
    [updateCategory, openSuccessSnackBar, openWarningSnackBar],
  )

  const handleModalClose = useCallback(() => {
    onModalClose()
  }, [onModalClose])

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
              {loading ? (
                <LoadingButton>カテゴリーを更新しています</LoadingButton>
              ) : (
                <Button
                  type={"submit"}
                  variant={"contained"}
                  color={"primary"}
                  startIcon={<CreateIcon />}
                  disabled={!isValid}
                >
                  カテゴリーを更新する
                </Button>
              )}
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </>
  )
}
