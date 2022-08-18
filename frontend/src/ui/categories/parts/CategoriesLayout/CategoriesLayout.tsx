import React, { useState } from "react"
import { Categories_CategoryFragment } from "~/graphql/types"
import { CategoryList } from "../CategoryList"
import { CategoryOperationMenu } from "../CategoryOperationMenu"
import { DeleteCategoryConfirmModal } from "../DeleteCategoryConfirmModal"
import { UpdateCategoryModal } from "../UpdateCategoryModal"

export function CategoriesLayout() {
  const [selectCategory, setSelectCategory] =
    useState<Categories_CategoryFragment | null>(null)

  function handleCategoryMenuClick(category: Categories_CategoryFragment) {
    setSelectCategory(category)
  }

  return (
    <>
      <CategoryList onCategoryMenuClick={handleCategoryMenuClick} />
      <CategoryOperationMenu />
      <UpdateCategoryModal category={selectCategory} />
      <DeleteCategoryConfirmModal category={selectCategory} />
    </>
  )
}
