import { Menu, MenuItem, Typography } from "@material-ui/core"
import React from "react"

interface CategoryOperationMenuProps {
  anchorElement: HTMLElement | null
  onMenuClose: () => void
  onEditButtonClick: () => void
  onDeleteButtonClick: () => void
}

export function CategoryOperationMenu({
  anchorElement,
  onMenuClose,
  onEditButtonClick,
  onDeleteButtonClick,
}: CategoryOperationMenuProps) {
  return (
    <>
      <Menu
        id={`category-item-menu`}
        anchorEl={anchorElement}
        keepMounted
        open={Boolean(anchorElement)}
        onClose={onMenuClose}
      >
        <MenuItem onClick={onEditButtonClick}>
          <Typography>編集</Typography>
        </MenuItem>
        <MenuItem onClick={onDeleteButtonClick}>
          <Typography color={"error"}>削除</Typography>
        </MenuItem>
      </Menu>
    </>
  )
}
