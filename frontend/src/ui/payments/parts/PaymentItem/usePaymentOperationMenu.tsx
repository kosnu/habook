import { ApolloError } from "@apollo/client"
import React, { useCallback, useState } from "react"
import { useSuccessSnackbar } from "src/ui/common/components/SuccessSnackBar"
import { useWarningSnackbar } from "src/ui/common/components/WarningSnackBar"
import { Payment } from "../../types"
import { PaymentOperationMenu } from "../PaymentOperationMenu"
import { useDeletePayment } from "./useDeletePayment"
import { useUpdatePaymentFormModal } from "./useUpdatePaymentFormModal"

export function usePaymentOperationMenu(payment: Payment) {
  const [anchorElement, setAnchorElement] = useState<HTMLElement | null>(null)
  const { openUpdatePaymentFormModal, renderUpdatePaymentFormModal } =
    useUpdatePaymentFormModal()
  const { deletePayment } = useDeletePayment()
  const { openSuccessSnackbar } = useSuccessSnackbar()
  const { openWarningSnackbar } = useWarningSnackbar()

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

  const handleDeleteButtonClick = useCallback(async () => {
    try {
      await deletePayment(payment.id)
      openSuccessSnackbar("支払いの削除ができました")
      handleMenuClose()
    } catch (e) {
      console.error(e)
      if (e instanceof ApolloError) {
        openWarningSnackbar(e.message)
      }
    }
  }, [
    deletePayment,
    payment,
    openSuccessSnackbar,
    openWarningSnackbar,
    handleMenuClose,
  ])

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
