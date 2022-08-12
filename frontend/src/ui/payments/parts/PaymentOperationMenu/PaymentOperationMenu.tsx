import { Menu, MenuItem, Typography } from "@mui/material"
import React from "react"
import { AnchorElement } from "src/ui/common/hooks/useAnchorElement"

interface PaymentOperationMenuProps {
  anchorElement: AnchorElement
  onMenuClose: () => void
  onEditButtonClick: () => void
  onDeleteButtonClick: () => void
}

export function PaymentOperationMenu({
  anchorElement,
  onMenuClose,
  onEditButtonClick,
  onDeleteButtonClick,
}: PaymentOperationMenuProps) {
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
