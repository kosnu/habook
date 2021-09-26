import { AppBar, Grid, Toolbar } from "@mui/material"
import React from "react"
import { AccountMenuButton } from "../molecules/AccountMenuButton"
import { AdditionalMenuButton } from "../molecules/AdditionalMenuButton"
import { HeaderTitle } from "../molecules/HeaderTitle"

export function Header() {
  return (
    <>
      <AppBar position={"static"} color={"default"}>
        <Toolbar>
          <Grid
            container
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Grid item>
              <HeaderTitle />
            </Grid>
            <Grid item>
              <AdditionalMenuButton />
              <AccountMenuButton />
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </>
  )
}
