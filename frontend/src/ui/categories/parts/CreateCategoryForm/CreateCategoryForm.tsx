import { ApolloError } from "@apollo/client"
import { Create as CreateIcon } from "@mui/icons-material"
import { Button, Divider, Grid } from "@mui/material"
import React from "react"
import { useSuccessSnackbar } from "~/ui/common/components/SuccessSnackBar"
import { useWarningSnackbar } from "~/ui/common/components/WarningSnackBar"
import { CategoryNameInput } from "../CategoryNameInput"
import { useCategoryName } from "./useCategoryName"
import { useCreateCategory } from "./useCreateCategory"

export function CreateCategoryForm() {
  const {
    categoryName,
    invalid,
    validationMessage,
    changeCategoryName,
    validateCategoryName,
  } = useCategoryName()
  const { isInvalid, createCategory } = useCreateCategory()
  const { openSuccessSnackbar } = useSuccessSnackbar()
  const { openWarningSnackbar } = useWarningSnackbar()

  function handleCategoryNameChange(input: string) {
    changeCategoryName(input)
  }

  function handleCategoryNameBlur() {
    validateCategoryName()
  }

  async function handleCreateButtonClick() {
    if (isInvalid) {
      openWarningSnackbar("入力が正しくありません")

      return
    }

    try {
      await createCategory()
      openSuccessSnackbar("カテゴリーの作成に成功しました")
    } catch (e) {
      console.error(e)

      if (e instanceof ApolloError) {
        openWarningSnackbar("カテゴリーの作成に失敗しました")
      }
    }
  }

  return (
    <>
      <Grid container spacing={4} direction={"column"}>
        <Grid item>
          <CategoryNameInput
            name={categoryName}
            error={invalid}
            helperText={validationMessage}
            onChange={handleCategoryNameChange}
            onBlur={handleCategoryNameBlur}
          />
        </Grid>
        <Grid item>
          <Divider variant={"fullWidth"} />
        </Grid>
        <Grid item>
          <Button
            variant={"contained"}
            color={"primary"}
            startIcon={<CreateIcon />}
            disabled={invalid}
            onClick={handleCreateButtonClick}
          >
            カテゴリーの作成を確定する
          </Button>
        </Grid>
      </Grid>
    </>
  )
}
