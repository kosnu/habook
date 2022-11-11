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
import React, { useCallback } from "react"
import { useForm } from "react-hook-form"
import { Categories_CategoryFragment } from "~/graphql/types"
import { useSnackbar } from "~/ui/common/hooks/SnackBar"
import { formSchema, FormSchema } from "../../updateForm"
import { useUpdateCategory } from "../UpdateCategoryModal/useUpdateCategory"

interface UpdateCategoryFormProps {
  category: Categories_CategoryFragment
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
  const { openSnackBar, SnackBar } = useSnackbar()

  const handleValid = useCallback(
    async (formData: FormSchema) => {
      try {
        await updateCategory(formData.categoryName, formData.categoryId)
        openSnackBar({
          message: "カテゴリーの更新に成功しました",
          severity: "success",
        })
      } catch (e) {
        console.error(e)

        if (e instanceof ApolloError) {
          openSnackBar({
            message: "カテゴリーの更新に失敗しました",
            severity: "warning",
          })
        }
      }
    },
    [updateCategory, openSnackBar],
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
                <Button
                  disabled
                  variant={"contained"}
                  color={"primary"}
                  startIcon={<CircularProgress size={"1rem"} />}
                >
                  カテゴリーを更新しています
                </Button>
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
      <SnackBar />
    </>
  )
}
