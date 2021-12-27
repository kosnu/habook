import { Menu, MenuItem, Typography } from "@mui/material"
import React from "react"
import { useDeleteCategoryConfirmModal } from "../DeleteCategoryConfirmModal"
import { useCategoryFormModal } from "../UpdateCategoryModal/useUpdateCategoryModal"
import { useCategoryOperationMenu } from "./useCategoryOperationMenu"

export function CategoryOperationMenu() {
  const { menuAnchorEl, closeMenu } = useCategoryOperationMenu()
  const { openModal: openUpdateCategoryModal } = useCategoryFormModal()
  const { openModal: openDeleteCategoryConfirmModal } =
    useDeleteCategoryConfirmModal()

  function handleClose() {
    closeMenu()
  }

  function handleEditButtonClick() {
    openUpdateCategoryModal()
    closeMenu()
  }

  function handleDeleteButtonClick() {
    openDeleteCategoryConfirmModal()
    closeMenu()
  }

  return (
    <>
      <Menu
        id={`category-item-menu`}
        anchorEl={menuAnchorEl}
        keepMounted
        open={Boolean(menuAnchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleEditButtonClick}>
          <Typography>編集</Typography>
        </MenuItem>
        <MenuItem onClick={handleDeleteButtonClick}>
          <Typography color={"error"}>削除</Typography>
        </MenuItem>
      </Menu>
    </>
  )
}
