import { Dialog, DialogContent, DialogTitle } from "@mui/material"
import React from "react"
import { Category } from "../../types"
import { UpdateCategoryForm } from "../UpdateCategoryForm"
import { useCategoryFormModal } from "./useUpdateCategoryModal"

interface UpdateCategoryModalProps {
  category: Category
}

export function UpdateCategoryModal({ category }: UpdateCategoryModalProps) {
  const { open, closeModal } = useCategoryFormModal()

  function handleClose() {
    closeModal()
  }

  return (
    <>
      <Dialog fullWidth onClose={handleClose} open={open} maxWidth={"sm"}>
        <DialogTitle>カテゴリーの編集</DialogTitle>
        <DialogContent>
          <UpdateCategoryForm category={category} onModalClose={handleClose} />
        </DialogContent>
      </Dialog>
    </>
  )
}
