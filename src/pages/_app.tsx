import { ApolloProvider } from "@apollo/client"
import DateFnsUtils from "@date-io/date-fns"
import { ThemeProvider } from "@material-ui/core"
import { MuiPickersUtilsProvider } from "@material-ui/pickers"
import type { AppProps } from "next/app"
import React from "react"
import { RecoilRoot } from "recoil"
import "../../styles/globals.css"
import { client } from "../graphql/apollo"
import { HeaderContainer } from "../ui/navigation/comtainer/HeaderContainer"
import { theme } from "../ui/theme"

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <ApolloProvider client={client}>
        <ThemeProvider theme={theme}>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <HeaderContainer />
            <Component {...pageProps} />
          </MuiPickersUtilsProvider>
        </ThemeProvider>
      </ApolloProvider>
    </RecoilRoot>
  )
}

export default MyApp
