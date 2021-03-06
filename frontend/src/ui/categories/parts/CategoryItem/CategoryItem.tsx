import { MoreVert as MoreVertIcon } from "@mui/icons-material"
import {
  IconButton,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
} from "@mui/material"
import React from "react"
import { Categories_CategoryFragment } from "../../../../graphql/types"
import { useCategoryOperationMenu } from "../CategoryOperationMenu/useCategoryOperationMenu"

interface CategoryItemProps {
  category: Categories_CategoryFragment
  onMenuButtonClick: (category: Categories_CategoryFragment) => void
}

export function CategoryItem({
  category,
  onMenuButtonClick,
}: CategoryItemProps) {
  const { openMenu } = useCategoryOperationMenu()

  function handleMenuButtonClick(event: React.MouseEvent<HTMLButtonElement>) {
    openMenu(event)
    onMenuButtonClick(category)
  }

  return (
    <>
      <ListItem button>
        <ListItemText primary={category.name} />
        <ListItemSecondaryAction>
          <IconButton
            edge={"end"}
            aria-label={"category-menu-more"}
            onClick={handleMenuButtonClick}
            size={"large"}
          >
            <MoreVertIcon />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    </>
  )
}
