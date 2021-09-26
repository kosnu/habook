import React from "react"
import { useAnchorElement } from "../../common/hooks/useAnchorElement"

export function usePaymentOperationMenu() {
  const { anchorEl, setAnchorElement, resetAnchorElement } =
    useAnchorElement("payment-menu")

  function openMenu(event: React.MouseEvent<HTMLButtonElement>) {
    setAnchorElement(event)
  }

  function closeMenu() {
    resetAnchorElement()
  }

  return { menuAnchorEl: anchorEl, openMenu: openMenu, closeMenu: closeMenu }
}
