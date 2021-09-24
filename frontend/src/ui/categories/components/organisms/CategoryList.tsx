import { List, Typography } from "@mui/material"
import React from "react"
import InfiniteScroll from "react-infinite-scroll-component"
import {
  Categories_CategoryFragment,
  CategoriesListQuery,
  CategoriesListQueryVariables,
  useCategoriesListQuery,
} from "../../../../graphql/types"
import { LoadingCircular } from "../../../common/components/atoms/LoadingCircular"
import { useLoginUser } from "../../../common/hooks/useLoginUser"
import { connectionToNodes } from "../../../common/utils/connectionToNodes"
import { useCategory } from "../../hooks/useCategory"
import { useCategoryFormModal } from "../../hooks/useCategoryFormModal"
import { useCategoryMenu } from "../../hooks/useCategoryMenu"
import { CategoryItem } from "../molecules/CategoryItem"
import { CategoryOperationMenu } from "../molecules/CategoryOperationMenu"
import { CategoryFormModal } from "./CategoryFormModal"

export function CategoryList() {
  const { userId } = useLoginUser()
  const { menuAnchorEl, openMenu, closeMenu } = useCategoryMenu()
  const { openModal } = useCategoryFormModal()
  const { selectCategory, deleteCategory } = useCategory()
  const { data, fetchMore, loading, error, refetch } = useCategoriesListQuery({
    variables: { userId: userId },
  })

  // TODO: データがないときの画面表示を実装する
  if (data === undefined && !loading) return <Typography>Error</Typography>

  if (data === undefined) return <></> // dataのundefinedを除去

  // TODO: エラーが発生したときの実装をする
  if (error) return <Typography>Error</Typography>

  const pageInfo = data.categories.pageInfo
  const categories = connectionToNodes(data.categories)

  async function handleMoreFetch() {
    try {
      await fetchMore<CategoriesListQuery, CategoriesListQueryVariables>({
        variables: {
          cursor: pageInfo.endCursor,
        },
      })
    } catch (e) {
      console.error(e)
    }
  }

  function handleMenuButtonClick(
    event: React.MouseEvent<HTMLButtonElement>,
    category: Categories_CategoryFragment,
  ) {
    openMenu(event)
    selectCategory(category)
  }

  function handleMenuClose() {
    closeMenu()
  }

  function handleEditButtonClick() {
    openModal()
    closeMenu()
  }

  async function handleDeleteButtonClick() {
    try {
      await deleteCategory()
      await refetch()
    } catch (e) {
      console.error(e)
    }
    closeMenu()
  }

  return (
    <>
      <List>
        <InfiniteScroll
          dataLength={categories.length}
          hasMore={pageInfo.hasNextPage}
          next={handleMoreFetch}
          loader={<LoadingCircular loading={loading} />}
        >
          {categories.map((category, index) => {
            return (
              <CategoryItem
                key={index}
                category={category}
                onMenuButtonClick={handleMenuButtonClick}
              />
            )
          })}
        </InfiniteScroll>
      </List>
      <LoadingCircular loading={loading} />
      <CategoryFormModal />
      <CategoryOperationMenu
        anchorElement={menuAnchorEl}
        onMenuClose={handleMenuClose}
        onEditButtonClick={handleEditButtonClick}
        onDeleteButtonClick={handleDeleteButtonClick}
      />
    </>
  )
}
