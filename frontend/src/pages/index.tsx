import Head from "next/head"
import React from "react"
import { DashboardPage } from "../ui/dashboard/pages/DashboardPage"

export default function Home() {
  return (
    <>
      <Head>
        <title>HABook</title>
        <link rel={"icon"} href={"/favicon.ico"} />
      </Head>
      <DashboardPage />
    </>
  )
}
