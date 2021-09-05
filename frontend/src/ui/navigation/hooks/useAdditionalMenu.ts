import React, { useCallback } from "react"

export function useAdditionalMenu() {
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
    openAdditionalMenu: handleMenuOpen,
    closeAdditionalMenu: handleMenuClose,
  }
}
