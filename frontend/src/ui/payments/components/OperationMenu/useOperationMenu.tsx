import React, { useCallback, useState } from "react"
import { Payment } from "../../types"
import { useUpdateFormModal } from "../UpdateFormModal"
import { useDeleteConfirmModal } from "../DeleteConfirmModal"
import { OperationMenu } from "./OperationMenu"

export function useOperationMenu(payment: Payment) {
  const [anchorElement, setAnchorElement] = useState<HTMLElement | null>(null)
  const { open: openUpdatePaymentFormModal, UpdatePaymentFormModal } =
    useUpdateFormModal()
  const { open: openDeletePaymentModal, DeleteConfirmModal } =
    useDeleteConfirmModal()

  const openMenu = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorElement(event.currentTarget)
  }, [])

  const closeMenu = useCallback(() => {
    setAnchorElement(null)
  }, [])

  const clickEditButton = useCallback(() => {
    openUpdatePaymentFormModal()
    closeMenu()
  }, [openUpdatePaymentFormModal, closeMenu])

  const clickDeleteButton = useCallback(() => {
    openDeletePaymentModal()
  }, [openDeletePaymentModal])

  const OperationMenuComponent = useCallback(() => {
    return (
      <>
        <OperationMenu
          anchorElement={anchorElement}
          onMenuClose={closeMenu}
          onEditButtonClick={clickEditButton}
          onDeleteButtonClick={clickDeleteButton}
        />
        <UpdatePaymentFormModal payment={payment} />
        <DeleteConfirmModal payment={payment} />
      </>
    )
  }, [
    anchorElement,
    closeMenu,
    clickEditButton,
    clickDeleteButton,
    UpdatePaymentFormModal,
    payment,
    DeleteConfirmModal,
  ])

  return {
    open: openMenu,
    OperationMenu: OperationMenuComponent,
  }
}
