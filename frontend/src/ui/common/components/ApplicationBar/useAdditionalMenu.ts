import React, { useCallback } from "react"
import { useAnchorElement } from "../../hooks/useAnchorElement"

export function useAdditionalMenu(menuId: string) {
  const { anchorEl, setAnchorElement, resetAnchorElement } =
    useAnchorElement(menuId)

  const handleMenuOpen = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorElement(event)
    },
    [setAnchorElement],
  )
  const handleMenuClose = useCallback(() => {
    resetAnchorElement()
  }, [resetAnchorElement])

  return {
    anchorEl: anchorEl,
    openAdditionalMenu: handleMenuOpen,
    closeAdditionalMenu: handleMenuClose,
  }
}
