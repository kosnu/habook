import React, { useCallback, useState } from "react"
import { Payments_PaymentFragment } from "src/graphql/types"
import { PaymentOperationMenu } from "../PaymentOperationMenu"

export function usePaymentOperationMenu() {
  const [anchorElement, setAnchorElement] = useState<HTMLElement | null>()
  const [payment, setPayment] = useState<Payments_PaymentFragment | null>()

  function handleMenuOpen(
    event: React.MouseEvent<HTMLButtonElement>,
    payment: Payments_PaymentFragment,
  ) {
    setAnchorElement(event.currentTarget)
    setPayment(payment)
  }

  const handleMenuClose = useCallback(() => {
    setAnchorElement(null)
    setPayment(null)
  }, [])

  const handleEditButtonClick = useCallback(() => {
    // TODO: 支払い編集モーダルを開く処理
    console.log("payment", payment)
    handleMenuClose()
  }, [payment, handleMenuClose])

  const handleDeleteButtonClick = useCallback(() => {
    // TODO: 支払いを削除する処理
    console.log("payment", payment)
    handleMenuClose()
  }, [payment, handleMenuClose])

  const renderOperationMenu = useCallback(() => {
    return (
      <>
        <PaymentOperationMenu
          anchorElement={anchorElement}
          onMenuClose={handleMenuClose}
          onEditButtonClick={handleEditButtonClick}
          onDeleteButtonClick={handleDeleteButtonClick}
        />
      </>
    )
  }, [
    anchorElement,
    handleMenuClose,
    handleEditButtonClick,
    handleDeleteButtonClick,
  ])

  return {
    openPaymentOperationMenu: handleMenuOpen,
    renderPaymentOperationMenu: renderOperationMenu,
  }
}
