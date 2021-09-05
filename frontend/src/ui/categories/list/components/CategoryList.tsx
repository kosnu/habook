import { List, Typography } from "@material-ui/core"
import React from "react"
import InfiniteScroll from "react-infinite-scroll-component"
import {
  Categories_CategoryFragment,
  CategoriesListQuery,
  CategoriesListQueryVariables,
  useCategoriesListQuery,
} from "../../../../graphql/types"
import { LoadingCircular } from "../../../common/components/LoadingCircular"
import { SuccessSnackBar } from "../../../common/components/SuccessSnackBar"
import { WarningSnackBar } from "../../../common/components/WarningSnackBar"
import { useLoginUser } from "../../../common/hooks/useLoginUser"
import { useAnchorElement } from "../hooks/useAnchorElement"
import { useCategory } from "../hooks/useCategory"
import { useCategoryFormModal } from "../hooks/useCategoryFormModal"
import { CategoryFormModal } from "./CategoryFormModal"
import { CategoryItem } from "./CategoryItem"
import { CategoryOperationMenu } from "./CategoryOperationMenu"

export function CategoryList() {
  const { userId } = useLoginUser()
  const { anchorEl, openMenu, closeMenu } = useAnchorElement()
  const { openModal } = useCategoryFormModal()
  const { selectCategory, deleteCategory } = useCategory()
  const { data, fetchMore, loading, error } = useCategoriesListQuery({
    variables: { userId: userId, enable: true, limit: 30 },
  })

  // TODO: データがないときの画面表示を実装する
  if (data === undefined && !loading) return <Typography>Error</Typography>

  if (data === undefined) return <></> // dataのundefinedを除去

  // TODO: エラーが発生したときの実装をする
  if (error) return <Typography>Error</Typography>

  const pageInfo = data.categories.pageInfo
  const categories = data.categories.edges
    .filter((value): value is NonNullable<typeof value> => !!value)
    .map((edge) => edge.node)
    .filter((node) => node.enable) // TODO: QueryでもEnable: trueしているので消したい

  async function handleMoreFetch() {
    return await fetchMore<CategoriesListQuery, CategoriesListQueryVariables>({
      variables: {
        cursor: pageInfo.endCursor,
      },
    })
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
    await deleteCategory()
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
      <SuccessSnackBar />
      <WarningSnackBar />
      <LoadingCircular loading={loading} />
      <CategoryFormModal />
      <CategoryOperationMenu
        anchorElement={anchorEl}
        onMenuClose={handleMenuClose}
        onEditButtonClick={handleEditButtonClick}
        onDeleteButtonClick={handleDeleteButtonClick}
      />
    </>
  )
}
