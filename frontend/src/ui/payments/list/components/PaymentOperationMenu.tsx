import { Menu, MenuItem, Typography } from "@material-ui/core"
import Link from "next/link"
import React from "react"
import { AnchorElement } from "../../../common/hooks/useAnchorElement"

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
          <Link href={"/payments/edit"}>編集</Link>
        </MenuItem>
        <MenuItem onClick={onDeleteButtonClick}>
          <Typography color={"error"}>削除</Typography>
        </MenuItem>
      </Menu>
    </>
  )
}
