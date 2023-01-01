import React, { useCallback } from "react"
import { Dialog, DialogContent, DialogTitle } from "@mui/material"
import { Payment } from "../../types"
import { UpdateForm } from "../UpdateForm"

interface UpdateFormModalProps {
  open: boolean
  payment: Payment
  onClose: () => void
}

export function UpdateFormModal({
  open,
  payment,
  onClose,
}: UpdateFormModalProps) {
  const handleClose = useCallback(() => {
    onClose()
  }, [onClose])

  return (
    <>
      <Dialog maxWidth={"sm"} fullWidth open={open} onClose={handleClose}>
        <DialogTitle>支払いの編集</DialogTitle>
        <DialogContent>
          <UpdateForm payment={payment} onModalClose={handleClose} />
        </DialogContent>
      </Dialog>
    </>
  )
}
