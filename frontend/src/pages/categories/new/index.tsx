import React from "react"
import Head from "next/head"
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
