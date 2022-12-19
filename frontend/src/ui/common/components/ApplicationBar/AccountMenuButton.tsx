import React from "react"
import { AccountCircle } from "@mui/icons-material"
import { Divider, IconButton, Menu, MenuItem, Typography } from "@mui/material"
import Link from "next/link"
import { useAccountMenu } from "./useAccountMenu"

const menuId = "primary-account-menu"

export function AccountMenuButton() {
  const { anchorEl, openAccountMenu, closeAccountMenu } = useAccountMenu(menuId)

  return (
    <>
      <IconButton color={"primary"} onClick={openAccountMenu} size={"large"}>
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
