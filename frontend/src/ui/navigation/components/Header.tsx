import { AppBar, Toolbar } from "@material-ui/core"
import React from "react"
import { AccountMenuButton } from "./AccountMenuButton"
import { AdditionalMenuButton } from "./AdditionalMenuButton"
import { HeaderTitle } from "./HeaderTitle"

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
