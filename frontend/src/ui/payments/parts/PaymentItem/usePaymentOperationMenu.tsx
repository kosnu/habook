import React, { useCallback, useState } from "react"
import { Payment } from "../../types"
import { PaymentOperationMenu } from "../PaymentOperationMenu"
import { useUpdatePaymentFormModal } from "./useUpdatePaymentFormModal"

export function usePaymentOperationMenu(payment: Payment) {
  const [anchorElement, setAnchorElement] = useState<HTMLElement | null>(null)
  const { openUpdatePaymentFormModal, renderUpdatePaymentFormModal } =
    useUpdatePaymentFormModal()

  const handleMenuOpen = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorElement(event.currentTarget)
    },
    [],
  )

  const handleMenuClose = useCallback(() => {
    setAnchorElement(null)
  }, [])

  const handleEditButtonClick = useCallback(() => {
    openUpdatePaymentFormModal()
    handleMenuClose()
  }, [openUpdatePaymentFormModal, handleMenuClose])

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
        {renderUpdatePaymentFormModal(payment)}
      </>
    )
  }, [
    anchorElement,
    handleMenuClose,
    handleEditButtonClick,
    handleDeleteButtonClick,
    renderUpdatePaymentFormModal,
    payment,
  ])

  return {
    openPaymentOperationMenu: handleMenuOpen,
    renderPaymentOperationMenu: renderOperationMenu,
  }
}
