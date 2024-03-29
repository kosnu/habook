import React, { useCallback } from "react"
import { List } from "@mui/material"
import InfiniteScroll from "react-infinite-scroll-component"
import { ErrorMessage, LoadingButton, LoadingCircular } from "~/ui/common/components"
import { useLoginUser } from "~/ui/common/hooks";
import { Category } from "../../types"
import { CategoryItem } from "../CategoryItem"
import { useCategories } from "./useCategories"

interface CategoryListProps {
  onCategoryMenuClick: (category: Category) => void
}

export function CategoryList({ onCategoryMenuClick }: CategoryListProps) {
  const { userId } = useLoginUser()
  const { loading, error, categories, pageInfo, fetchMore } =
    useCategories(userId)

  const handleMoreFetch = useCallback(async () => {
    await fetchMore()
  }, [fetchMore])

  const handleMenuButtonClick = useCallback(
    (category: Category) => {
      onCategoryMenuClick(category)
    },
    [onCategoryMenuClick],
  )

  if (error) {
    return <ErrorMessage message={error.message} />
  }

  return (
    <>
      <List>
        <LoadingButton />
        <InfiniteScroll
          dataLength={categories.length}
          hasMore={pageInfo?.hasNextPage ?? false}
          next={handleMoreFetch}
          loader={<LoadingCircular loading={loading} />}
        >
          {categories.map((category) => {
            return (
              <CategoryItem
                key={category.id}
                category={category}
                onMenuButtonClick={handleMenuButtonClick}
              />
            )
          })}
        </InfiniteScroll>
      </List>
    </>
  )
}
