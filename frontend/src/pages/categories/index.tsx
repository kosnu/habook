import Head from "next/head"
import React from "react"
import { CategoryListTemplate } from "../../ui/categories/components/templates/CategoryListTemplate"

export default function index() {
  return (
    <>
      <Head>
        <title>カテゴリー | HABook</title>
        <link rel={"icon"} href={"/favicon.ico"} />
      </Head>
      <CategoryListTemplate />
    </>
  )
}
