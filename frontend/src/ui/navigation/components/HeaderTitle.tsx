import { Grid, Typography } from "@material-ui/core"
import Link from "next/link"
import React from "react"
import { LogoIcon } from "../../theme/LogoIcon"

export function HeaderTitle() {
  return (
    <>
      <Link href={"/"}>
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
      </Link>
    </>
  )
}
