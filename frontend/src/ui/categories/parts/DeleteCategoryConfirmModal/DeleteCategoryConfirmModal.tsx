import { ApolloError } from "@apollo/client"
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material"
import React from "react"
import { Categories_CategoryFragment } from "~/graphql/types"
import { useSnackbar } from "../../hooks/useSnackbar"
import { useDeleteCategory } from "./useDeleteCategory"
import { useDeleteCategoryConfirmModal } from "./useDeleteCategoryConfirmModal"

interface DeleteCategoryConfirmModalProps {
  category: Categories_CategoryFragment | null
}

export function DeleteCategoryConfirmModal({
  category,
}: DeleteCategoryConfirmModalProps) {
  const { open, closeModal } = useDeleteCategoryConfirmModal()
  const { deleteCategory } = useDeleteCategory(category)
  const { openSuccessSnackBar, openWarningSnackBar } = useSnackbar()

  function handleClose() {
    closeModal()
  }

  async function handleDeleteButtonClick() {
    try {
      await deleteCategory()
      openSuccessSnackBar("カテゴリーの削除に成功しました")
    } catch (e) {
      console.error(e)

      if (e instanceof ApolloError) {
        openWarningSnackBar("カテゴリーの削除に失敗しました")
      }
    }
    closeModal()
  }

  return (
    <>
      <Dialog onClose={handleClose} open={open} maxWidth={"sm"} fullWidth>
        <DialogTitle>カテゴリーの削除</DialogTitle>
        <DialogContent>
          <Typography>本当に削除してもよろしいですか？</Typography>
        </DialogContent>
        <DialogActions>
          <Button color={"inherit"} onClick={handleClose}>
            キャンセル
          </Button>
          <Button
            color={"error"}
            variant={"outlined"}
            onClick={handleDeleteButtonClick}
          >
            カテゴリーを削除する
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
