import React, { useCallback, useState } from "react"
import { Payment } from "../../types"
import { UpdatePaymentFormModal } from "../UpdatePaymentFormModal"

export function useUpdatePaymentFormModal() {
  const [open, setOpen] = useState<boolean>(false)

  const handleModalOpen = useCallback(() => {
    setOpen(true)
  }, [])

  const handleModalClose = useCallback(() => {
    setOpen(false)
  }, [])

  const renderUpdatePaymentFormModal = useCallback(
    (payment: Payment) => {
      return (
        <>
          <UpdatePaymentFormModal
            open={open}
            payment={payment}
            onClose={handleModalClose}
          />
        </>
      )
    },
    [open, handleModalClose],
  )

  return {
    openUpdatePaymentFormModal: handleModalOpen,
    renderUpdatePaymentFormModal: renderUpdatePaymentFormModal,
  }
}
