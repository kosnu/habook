import React from "react"
import Head from "next/head"
import { PaymentsPage } from "~/ui/payments/pages/PaymentsPage"

export default function index() {
  return (
    <>
      <Head>
        <title>支払い一覧 | HABook</title>
        <link rel={"icon"} href={"/favicon.ico"} />
      </Head>
      <PaymentsPage />
    </>
  )
}
