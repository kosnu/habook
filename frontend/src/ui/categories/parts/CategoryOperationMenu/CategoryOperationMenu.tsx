import React, { useCallback } from "react"
import { Menu, MenuItem, Typography } from "@mui/material"
import { useDeleteCategoryConfirmModal } from "../DeleteCategoryConfirmModal"
import { useCategoryFormModal } from "../UpdateCategoryModal/useUpdateCategoryModal"
import { useCategoryOperationMenu } from "./useCategoryOperationMenu"

export function CategoryOperationMenu() {
  const { menuAnchorEl, closeMenu } = useCategoryOperationMenu()
  const { openModal: openUpdateCategoryModal } = useCategoryFormModal()
  const { openModal: openDeleteCategoryConfirmModal } =
    useDeleteCategoryConfirmModal()

  const handleClose = useCallback(() => {
    closeMenu()
  }, [closeMenu])

  const handleEditButtonClick = useCallback(() => {
    openUpdateCategoryModal()
    closeMenu()
  }, [closeMenu, openUpdateCategoryModal])

  const handleDeleteButtonClick = useCallback(() => {
    openDeleteCategoryConfirmModal()
    closeMenu()
  }, [closeMenu, openDeleteCategoryConfirmModal])

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
