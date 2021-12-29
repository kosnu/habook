import { ApolloError } from "@apollo/client"
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material"
import React from "react"
import { Categories_CategoryFragment } from "src/graphql/types"
import { useSuccessSnackbar } from "src/ui/common/components/SuccessSnackBar"
import { useWarningSnackbar } from "src/ui/common/components/WarningSnackBar"
import { UpdateCategoryForm } from "../UpdateCategoryForm"
import { useUpdateCategory } from "./useUpdateCategory"
import { useCategoryFormModal } from "./useUpdateCategoryModal"

interface UpdateCategoryModalProps {
  category: Categories_CategoryFragment | null
}

export function UpdateCategoryModal({ category }: UpdateCategoryModalProps) {
  const { open, closeModal } = useCategoryFormModal()
  const { isInvalid, updateCategory } = useUpdateCategory(category)
  const { openSuccessSnackbar } = useSuccessSnackbar()
  const { openWarningSnackbar } = useWarningSnackbar()

  function handleClose() {
    closeModal()
  }

  async function handleUpdateButtonClick() {
    if (isInvalid) {
      openWarningSnackbar("入力が正しくありません")

      return
    }

    try {
      await updateCategory()
      openSuccessSnackbar("カテゴリーの更新に成功しました")
    } catch (e) {
      console.error(e)

      if (e instanceof ApolloError) {
        openWarningSnackbar("カテゴリーの作成に失敗しました")
      }
    }
    closeModal()
  }

  return (
    <>
      <Dialog fullWidth onClose={handleClose} open={open} maxWidth={"sm"}>
        <DialogTitle>カテゴリーの編集</DialogTitle>
        <DialogContent>
          <UpdateCategoryForm category={category} />
        </DialogContent>
        <DialogActions>
          <Button color={"inherit"} onClick={handleClose}>
            キャンセル
          </Button>
          <Button
            color={"primary"}
            variant={"contained"}
            disabled={isInvalid}
            onClick={handleUpdateButtonClick}
          >
            カテゴリーを更新する
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
