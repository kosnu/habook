import React from "react"
import type { AppProps } from "next/app"
import { ApolloProvider } from "@apollo/client"
import { StyledEngineProvider } from "@mui/material"
import { ThemeProvider } from "@mui/material/styles"
import { LocalizationProvider } from "@mui/x-date-pickers"
import { AdapterDateFns as DateAdapter } from "@mui/x-date-pickers/AdapterDateFns"
import { RecoilRoot } from "recoil"
import { client } from "~/graphql/apollo"
import { ApplicationBar } from "~/ui/common/components"
import { theme } from "~/ui/theme"
import "../ui/theme/styles/globals.css"

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <ApolloProvider client={client}>
        <StyledEngineProvider injectFirst>
          <ThemeProvider theme={theme}>
            <LocalizationProvider dateAdapter={DateAdapter}>
              <ApplicationBar />
              <Component {...pageProps} />
            </LocalizationProvider>
          </ThemeProvider>
        </StyledEngineProvider>
      </ApolloProvider>
    </RecoilRoot>
  )
}

export default MyApp
