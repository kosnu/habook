import React from "react"
import { Grid, Typography } from "@mui/material"
import Link from "next/link"
import { LogoIcon } from "~/ui/common/components"

export function Title() {
  return (
    <>
      <Link href={"/"} passHref>
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
