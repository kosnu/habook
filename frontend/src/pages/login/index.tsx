import Head from "next/head"
import React from "react"
import { LoginTemplate } from "../../ui/login/components/tenplates/LoginTemplate"

export default function index() {
  return (
    <>
      <Head>
        <title>Login | HABook</title>
        <link rel={"icon"} href={"/favicon.ico"} />
      </Head>
      <LoginTemplate />
    </>
  )
}
