import React from "react"
import Head from "next/head"
import { NewPaymentPage } from "~/ui/payments/pages/NewPaymentPage"

export default function New() {
  return (
    <>
      <Head>
        <title>支払いの作成 | HABook</title>
        <link rel={"icon"} href={"/favicon.ico"} />
      </Head>
      <NewPaymentPage />
    </>
  )
}
