import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@material-ui/core"
import React from "react"
import { useCategoryFormModal } from "../../hooks/useCategoryFormModal"
import { useUpdateCategoryForm } from "../../hooks/useUpdateCategoryForm"
import { UpdateCategoryForm } from "./UpdateCategoryForm"

export function CategoryFormModal() {
  const { open, closeModal } = useCategoryFormModal()
  const { invalid, updateCategory, resetForm } = useUpdateCategoryForm()

  function handleClose() {
    closeModal()
    resetForm()
  }

  async function handleUpdateButtonClick() {
    await updateCategory()
    closeModal()
  }

  return (
    <>
      <Dialog
        onClose={handleClose}
        open={open}
        maxWidth={"md"}
        PaperProps={{ style: { width: "640px", height: "240px" } }}
      >
        <DialogTitle>カテゴリーの編集</DialogTitle>
        <DialogContent>
          <UpdateCategoryForm />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color={"primary"}>
            キャンセル
          </Button>
          <Button
            color={"primary"}
            variant={"contained"}
            disabled={invalid}
            onClick={handleUpdateButtonClick}
          >
            カテゴリーを更新する
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
