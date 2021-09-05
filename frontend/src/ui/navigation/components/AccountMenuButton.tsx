import {
  Divider,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from "@material-ui/core"
import { AccountCircle } from "@material-ui/icons"
import Link from "next/link"
import React from "react"
import { useAccountMenu } from "../hooks/useAccountMenu"

const menuId = "primary-account-menu"

export function AccountMenuButton() {
  const { anchorEl, openAccountMenu, closeAccountMenu } = useAccountMenu()
  return (
    <>
      <IconButton
        aria-label="account of current user"
        aria-controls="primary-search-account-menu"
        aria-haspopup="true"
        color="primary"
        onClick={openAccountMenu}
      >
        <AccountCircle />
      </IconButton>
      <Menu
        id={menuId}
        keepMounted
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        open={Boolean(anchorEl)}
        onClose={closeAccountMenu}
      >
        <MenuItem onClick={closeAccountMenu}>
          {/*TODO: 支払い一覧画面*/}
          <Link href={"/payments"}>支払い一覧</Link>
        </MenuItem>
        <MenuItem onClick={closeAccountMenu}>
          <Link href={"/categories/"}>カテゴリー一覧</Link>
        </MenuItem>
        <Divider />
        <MenuItem onClick={closeAccountMenu}>
          {/*TODO: 設定画面*/}
          <Link href={"/settings"}>設定</Link>
        </MenuItem>
        <Divider />
        <MenuItem onClick={closeAccountMenu}>
          {/*TODO: ログアウト処理*/}
          <Typography>ログアウト</Typography>
        </MenuItem>
      </Menu>
    </>
  )
}
