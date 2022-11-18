import { ApolloError } from "@apollo/client"
import { Delete as DeleteIcon } from "@mui/icons-material"
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material"
import React, { useCallback } from "react"
import { LoadingButton } from "~/ui/common/components/LoadingButton"
import { useLoginUser } from "~/ui/common/hooks/useLoginUser"
import { Category } from "../../types"
import { useSnackbar } from "../../hooks/useSnackbar"
import { useDeleteCategory } from "./useDeleteCategory"
import { useDeleteCategoryConfirmModal } from "./useDeleteCategoryConfirmModal"

interface DeleteCategoryConfirmModalProps {
  category: Category
}

export function DeleteCategoryConfirmModal({
  category,
}: DeleteCategoryConfirmModalProps) {
  const { userId } = useLoginUser()
  const { open, closeModal } = useDeleteCategoryConfirmModal()
  const { deleteCategory, loading } = useDeleteCategory()
  const { openSuccessSnackBar, openWarningSnackBar } = useSnackbar()

  const handleClose = useCallback(() => {
    closeModal()
  }, [closeModal])

  const handleDeleteButtonClick = useCallback(async () => {
    try {
      await deleteCategory(category, userId)
      openSuccessSnackBar("カテゴリーの削除に成功しました")
    } catch (e) {
      console.error(e)

      if (e instanceof ApolloError) {
        openWarningSnackBar("カテゴリーの削除に失敗しました")
      }
    }
    closeModal()
  }, [
    category,
    closeModal,
    deleteCategory,
    openSuccessSnackBar,
    openWarningSnackBar,
    userId,
  ])

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
          {loading ? (
            <LoadingButton>カテゴリーを削除しています</LoadingButton>
          ) : (
            <Button
              color={"error"}
              variant={"outlined"}
              startIcon={<DeleteIcon />}
              onClick={handleDeleteButtonClick}
            >
              カテゴリーを削除する
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </>
  )
}
