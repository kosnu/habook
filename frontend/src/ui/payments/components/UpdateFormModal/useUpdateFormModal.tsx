import React, { useCallback, useState } from "react"
import { Payment } from "../../types"
import { UpdateFormModal } from "./UpdateFormModal"

export function useUpdateFormModal() {
  const [open, setOpen] = useState<boolean>(false)

  const openModal = useCallback(() => {
    setOpen(true)
  }, [])

  const closeModal = useCallback(() => {
    setOpen(false)
  }, [])

  const UpdatePaymentFormModalComponent = useCallback(
    ({ payment }: { payment: Payment }) => {
      return (
        <>
          <UpdateFormModal open={open} payment={payment} onClose={closeModal} />
        </>
      )
    },
    [open, closeModal],
  )

  return {
    open: openModal,
    UpdatePaymentFormModal: UpdatePaymentFormModalComponent,
  }
}
