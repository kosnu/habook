import React from "react"
import { Menu, MenuItem, Typography } from "@mui/material"

interface OperationMenuProps {
  anchorElement: HTMLElement | null | undefined
  onMenuClose: () => void
  onEditButtonClick: () => void
  onDeleteButtonClick: () => void
}

export function OperationMenu({
  anchorElement,
  onMenuClose,
  onEditButtonClick,
  onDeleteButtonClick,
}: OperationMenuProps) {
  return (
    <>
      <Menu
        id={`payment-item-menu`}
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
