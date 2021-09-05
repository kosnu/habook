import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@material-ui/core"
import React, { useCallback } from "react"
import { useCategory } from "../hooks/useCategory"
import { useCategoryFormModal } from "../hooks/useCategoryFormModal"
import { useCategoryNameForm } from "../hooks/useCategoryNameForm"
import { CategoryNameForm } from "./CategoryNameForm"

export function CategoryFormModal() {
  const { open, closeModal } = useCategoryFormModal()
  const { updateCategory } = useCategory()
  const { validation, resetCategoryName } = useCategoryNameForm()

  const handleClose = useCallback(() => {
    resetCategoryName()
    closeModal()
  }, [resetCategoryName, closeModal])

  const handleUpdateButtonClick = useCallback(async () => {
    await updateCategory()
    closeModal()
  }, [updateCategory, closeModal])

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
          <CategoryNameForm />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color={"primary"}>
            キャンセル
          </Button>
          <Button
            color={"primary"}
            variant={"contained"}
            disabled={validation.isError}
            onClick={handleUpdateButtonClick}
          >
            カテゴリーを更新する
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
