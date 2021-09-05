import { Button, Menu, MenuItem } from "@material-ui/core"
import {
  Add as AddIcon,
  ArrowDropDown as ArrowDropDownIcon,
} from "@material-ui/icons"
import Link from "next/link"
import React from "react"
import { useAdditionalMenu } from "../hooks/useAdditionalMenu"

const menuId = "primary-additional-menu"

export function AdditionalMenuButton() {
  const { anchorEl, openAdditionalMenu, closeAdditionalMenu } =
    useAdditionalMenu()

  return (
    <>
      <Button
        aria-label="additional-menu-icon"
        // aria-controls={menuId}
        aria-haspopup="true"
        color="primary"
        onClick={openAdditionalMenu}
      >
        <AddIcon />
        <ArrowDropDownIcon />
      </Button>
      <Menu
        id={menuId}
        keepMounted
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        open={Boolean(anchorEl)}
        onClose={closeAdditionalMenu}
      >
        <MenuItem onClick={closeAdditionalMenu}>
          <Link href={"/payments/new"}>支払いの作成</Link>
        </MenuItem>
        <MenuItem onClick={closeAdditionalMenu}>
          <Link href={"/categories/new"}>カテゴリーの作成</Link>
        </MenuItem>
      </Menu>
    </>
  )
}
