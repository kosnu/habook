import { Dialog, DialogContent, DialogTitle } from "@mui/material"
import React, { useCallback } from "react"
import { Payment } from "../../types"
import { UpdatePaymentForm } from "../UpdatePaymentForm"

interface UpdatePaymentFormModalProps {
  open: boolean
  payment: Payment
  onClose: () => void
}

export function UpdatePaymentFormModal({
  open,
  payment,
  onClose,
}: UpdatePaymentFormModalProps) {
  const handleClose = useCallback(() => {
    onClose()
  }, [onClose])

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth={"md"}
        PaperProps={{ style: { width: "640px" } }}
      >
        <DialogTitle>支払いの編集</DialogTitle>
        <DialogContent>
          <UpdatePaymentForm payment={payment} onModalClose={handleClose} />
        </DialogContent>
      </Dialog>
    </>
  )
}
