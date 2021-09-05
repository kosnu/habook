import React, { useCallback } from "react"

export function useAnchorElement() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)

  const handleMenuOpen = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(event.currentTarget)
    },
    [setAnchorEl],
  )
  const handleMenuClose = useCallback(() => {
    setAnchorEl(null)
  }, [setAnchorEl])

  return {
    anchorEl: anchorEl,
    openMenu: handleMenuOpen,
    closeMenu: handleMenuClose,
  }
}
