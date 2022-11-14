import { MoreVert as MoreVertIcon } from "@mui/icons-material"
import {
  IconButton,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
} from "@mui/material"
import React, { useCallback } from "react"
import { Category } from "../../types"
import { useCategoryOperationMenu } from "../CategoryOperationMenu/useCategoryOperationMenu"

interface CategoryItemProps {
  category: Category
  onMenuButtonClick: (category: Category) => void
}

export function CategoryItem({
  category,
  onMenuButtonClick,
}: CategoryItemProps) {
  const { openMenu } = useCategoryOperationMenu()

  const handleMenuButtonClick = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      openMenu(event)
      onMenuButtonClick(category)
    },
    [category, onMenuButtonClick, openMenu],
  )

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
