import { Box, Container, Grid, Paper, Typography } from "@mui/material"
import React from "react"
import { LogoIcon } from "../../../common/components/atoms/LogoIcon"
import { theme } from "../../../theme"
import { Title } from "../molecules/Title"
import { LoginForm } from "../organisms/LoginForm"

export function LoginTemplate() {
  return (
    <>
      <Container maxWidth={"md"}>
        <Box padding={3}>
          <Grid container spacing={4} direction={"column"}>
            <Grid item>
              <Box
                display={"flex"}
                justifyContent={"center"}
                alignContent={"center"}
              >
                <LogoIcon />
              </Box>
            </Grid>
            <Grid item textAlign={"center"}>
              <Typography variant={"h4"} color={theme.palette.primary.main}>
                Sign in to HABook
              </Typography>
            </Grid>
            <Grid item>
              <Paper>
                <Box padding={8}>
                  <LoginForm />
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </>
  )
}
