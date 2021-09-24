import { ApolloProvider } from "@apollo/client"
import { LocalizationProvider } from "@mui/lab/"
import DateAdapter from "@mui/lab/AdapterDateFns"
import { StyledEngineProvider } from "@mui/material"
import { Theme, ThemeProvider } from "@mui/material/styles"
import "@mui/styles"
import type { AppProps } from "next/app"
import React from "react"
import { RecoilRoot } from "recoil"
import { client } from "../graphql/apollo"
import { Header } from "../ui/navigation/components/Header"
import { theme } from "../ui/theme"
import "../ui/theme/styles/globals.css"

declare module "@mui/styles" {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface DefaultTheme extends Theme {}
}

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <ApolloProvider client={client}>
        <StyledEngineProvider injectFirst>
          <ThemeProvider theme={theme}>
            <LocalizationProvider dateAdapter={DateAdapter}>
              <Header />
              <Component {...pageProps} />
            </LocalizationProvider>
          </ThemeProvider>
        </StyledEngineProvider>
      </ApolloProvider>
    </RecoilRoot>
  )
}

export default MyApp
