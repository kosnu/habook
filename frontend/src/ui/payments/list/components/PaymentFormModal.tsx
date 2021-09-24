import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material"
import React, { useCallback } from "react"
import { usePayment } from "../hooks/usePayment"
import { usePaymentFormModal } from "../hooks/usePaymentFormModal"

export function PaymentFormModal() {
  const { open, closeModal } = usePaymentFormModal()
  const { selectedPayment, updatePayment } = usePayment()
  // TODO: Validation

  const handleClose = useCallback(() => {
    closeModal()
  }, [closeModal])

  const handleUpdateButtonClick = useCallback(async () => {
    await updatePayment()
    closeModal()
  }, [updatePayment, closeModal])

  return (
    <>
      <Dialog onClose={handleClose} open={open} maxWidth={"md"}>
        <DialogTitle>支払いの編集</DialogTitle>
        <DialogContent>
          {/* TODO: 支払いフォーム */}
          {selectedPayment?.product.name}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color={"primary"}>
            キャンセル
          </Button>
          <Button
            color={"primary"}
            variant={"contained"}
            // disabled={validation.isError}
            onClick={handleUpdateButtonClick}
          >
            支払いを更新する
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
