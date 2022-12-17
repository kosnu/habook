import React, { useCallback } from "react"
import { useAnchorElement } from "~/ui/common/hooks"

export function useCategoryOperationMenu() {
  const { anchorEl, setAnchorElement, resetAnchorElement } = useAnchorElement(
    "category-operation-menu",
  )

  const openMenu = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorElement(event)
    },
    [setAnchorElement],
  )

  const closeMenu = useCallback(() => {
    resetAnchorElement()
  }, [resetAnchorElement])

  return { menuAnchorEl: anchorEl, openMenu: openMenu, closeMenu: closeMenu }
}
