import Head from "next/head"
import React from "react"
import { NewCategoryTemplate } from "../../../ui/categories/components/templates/NewCategoryTemplate"

export default function New() {
  return (
    <>
      <Head>
        <title>カテゴリーの作成 | HABook</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NewCategoryTemplate />
    </>
  )
}
