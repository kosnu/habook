import Head from "next/head"
import React from "react"
import { CreateCategoryPage } from "~/ui/categories/pages/CreateCategoryPage"

export default function New() {
  return (
    <>
      <Head>
        <title>カテゴリーの作成 | HABook</title>
        <link rel={"icon"} href={"/favicon.ico"} />
      </Head>
      <CreateCategoryPage />
    </>
  )
}
