import { AppBar, Toolbar } from "@mui/material"
import React from "react"
import { AccountMenuButton } from "../molecules/AccountMenuButton"
import { AdditionalMenuButton } from "../molecules/AdditionalMenuButton"
import { HeaderTitle } from "../molecules/HeaderTitle"

export function Header() {
  return (
    <>
      <AppBar position="static" color={"default"}>
        <Toolbar>
          <HeaderTitle />
          <AdditionalMenuButton />
          <AccountMenuButton />
        </Toolbar>
      </AppBar>
    </>
  )
}
