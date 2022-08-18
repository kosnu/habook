import React from "react"
import { useAnchorElement } from "~/ui/common/hooks/useAnchorElement"

export function useCategoryOperationMenu() {
  const { anchorEl, setAnchorElement, resetAnchorElement } = useAnchorElement(
    "category-operation-menu",
  )

  function openMenu(event: React.MouseEvent<HTMLButtonElement>) {
    setAnchorElement(event)
  }

  function closeMenu() {
    resetAnchorElement()
  }

  return { menuAnchorEl: anchorEl, openMenu: openMenu, closeMenu: closeMenu }
}
