import Head from "next/head"
import React from "react"
import { PaymentListTemplate } from "../../ui/payments/components/templates/PaymentListTemplate"

export default function index() {
  return (
    <>
      <Head>
        <title>支払い一覧 | HABook</title>
        <link rel={"icon"} href={"/favicon.ico"} />
      </Head>
      <PaymentListTemplate />
    </>
  )
}
