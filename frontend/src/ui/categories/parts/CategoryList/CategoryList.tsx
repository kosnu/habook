import { List } from "@mui/material"
import React from "react"
import InfiniteScroll from "react-infinite-scroll-component"
import { Category } from "../../types"
import { LoadingCircular } from "~/ui/common/components/LoadingCircular"
import { ErrorMessage } from "~/ui/common/components/ErrorMessage"
import { useLoginUser } from "~/ui/common/hooks/useLoginUser"
import { CategoryItem } from "../CategoryItem"
import { useCategories } from "./useCategories"

interface CategoryListProps {
  onCategoryMenuClick: (category: Category) => void
}

export function CategoryList({ onCategoryMenuClick }: CategoryListProps) {
  const { userId } = useLoginUser()
  const { loading, error, categories, pageInfo, fetchMore } =
    useCategories(userId)

  if (error) {
    return <ErrorMessage message={error.message} />
  }

  async function handleMoreFetch() {
    await fetchMore()
  }

  function handleMenuButtonClick(category: Category) {
    onCategoryMenuClick(category)
  }

  return (
    <>
      <List>
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
