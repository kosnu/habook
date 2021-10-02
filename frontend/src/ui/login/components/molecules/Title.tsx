import { Grid, Typography } from "@mui/material"
import React from "react"
import { LogoIcon } from "../../../common/components/atoms/LogoIcon"

export function Title() {
  return (
    <>
      <Grid
        container
        spacing={1}
        justifyContent={"flex-start"}
        style={{ cursor: "pointer" }}
      >
        <Grid item xs={false}>
          <LogoIcon width={35} height={30} />
        </Grid>
        <Grid item xs={false}>
          <Typography variant={"h6"} color={"primary"}>
            HABook
          </Typography>
        </Grid>
      </Grid>
    </>
  )
}
