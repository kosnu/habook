import { AppBar, Grid, Toolbar } from "@mui/material"
import React from "react"
import { AccountMenuButton } from "./AccountMenuButton"
import { AdditionalMenuButton } from "./AdditionalMenuButton"
import { Title } from "./Title"

export function ApplicationBar() {
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
              <Title />
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
