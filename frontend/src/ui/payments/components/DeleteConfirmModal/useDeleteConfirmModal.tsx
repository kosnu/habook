import React, { useCallback, useState } from "react"
import { Payment } from "../../types"
import { DeleteConfirmModal } from "./DeleteConfirmModal"

export function useDeleteConfirmModal() {
  const [open, setOpen] = useState<boolean>(false)

  const openModal = useCallback(() => {
    setOpen(true)
  }, [])

  const closeModal = useCallback(() => {
    setOpen(false)
  }, [])

  const DeleteConfirmModalComponent = useCallback(
    ({ payment }: { payment: Payment }) => {
      return (
        <>
          <DeleteConfirmModal
            open={open}
            paymentId={payment.id}
            onClose={closeModal}
          />
        </>
      )
    },
    [open, closeModal],
  )

  return {
    open: openModal,
    DeleteConfirmModal: DeleteConfirmModalComponent,
  }
}
