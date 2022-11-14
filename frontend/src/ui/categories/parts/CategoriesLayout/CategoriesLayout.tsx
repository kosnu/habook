import React, { useCallback, useState } from "react"
import { Category } from "../../types"
import { CategoryList } from "../CategoryList"
import { CategoryOperationMenu } from "../CategoryOperationMenu"
import { DeleteCategoryConfirmModal } from "../DeleteCategoryConfirmModal"
import { UpdateCategoryModal } from "../UpdateCategoryModal"

export function CategoriesLayout() {
  const [selectCategory, setSelectCategory] = useState<Category | null>(null)

  const handleCategoryMenuClick = useCallback(
    (category: Category) => {
      setSelectCategory(category)
    },
    [setSelectCategory],
  )

  return (
    <>
      <CategoryList onCategoryMenuClick={handleCategoryMenuClick} />
      <CategoryOperationMenu />
      {selectCategory && (
        <>
          <UpdateCategoryModal category={selectCategory} />
          <DeleteCategoryConfirmModal category={selectCategory} />
        </>
      )}
    </>
  )
}
