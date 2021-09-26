import Head from "next/head"
import React from "react"
import { NewPaymentTemplate } from "../../../ui/payments/components/templates/NewPaymentTemplate"

export default function New() {
  return (
    <>
      <Head>
        <title>支払いの作成 | HABook</title>
        <link rel={"icon"} href={"/favicon.ico"} />
      </Head>
      <NewPaymentTemplate />
    </>
  )
}
