import Head from "next/head"
import React from "react"
import { CategoriesPage } from "~/ui/categories/pages/CategoriesPage"

export default function index() {
  return (
    <>
      <Head>
        <title>カテゴリー | HABook</title>
        <link rel={"icon"} href={"/favicon.ico"} />
      </Head>
      <CategoriesPage />
    </>
  )
}
