import React from "react"
import { useAnchorElement } from "../../common/hooks/useAnchorElement"

export function useCategoryMenu() {
  const { anchorEl, setAnchorElement, resetAnchorElement } =
    useAnchorElement("category-menu")

  function openMenu(event: React.MouseEvent<HTMLButtonElement>) {
    setAnchorElement(event)
  }

  function closeMenu() {
    resetAnchorElement()
  }

  return { menuAnchorEl: anchorEl, openMenu: openMenu, closeMenu: closeMenu }
}
