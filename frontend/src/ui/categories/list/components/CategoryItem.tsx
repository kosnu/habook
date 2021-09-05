import {
  IconButton,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
} from "@material-ui/core"
import { MoreVert as MoreVertIcon } from "@material-ui/icons"
import React, { useCallback } from "react"
import { Categories_CategoryFragment } from "../../../../graphql/types"

interface CategoryItemProps {
  category: Categories_CategoryFragment
  onMenuButtonClick: (
    event: React.MouseEvent<HTMLButtonElement>,
    category: Categories_CategoryFragment,
  ) => void
}

export function CategoryItem({
  category,
  onMenuButtonClick,
}: CategoryItemProps) {
  const handleMenuButtonClick = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      onMenuButtonClick(event, category)
    },
    [category, onMenuButtonClick],
  )

  return (
    <>
      <ListItem button>
        <ListItemText primary={category.name} />
        <ListItemSecondaryAction>
          <IconButton
            edge="end"
            aria-label="category-menu-more"
            onClick={handleMenuButtonClick}
          >
            <MoreVertIcon />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    </>
  )
}
