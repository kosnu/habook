import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@material-ui/core"
import React, { useCallback } from "react"
import { usePaymentFormModal } from "../hooks/usePaymentFormModal"

export function PaymentFormModal() {
  const { open, closeModal } = usePaymentFormModal()
  // TODO: UpdatePayment
  // TODO: Validation

  const handleClose = useCallback(() => {
    closeModal()
  }, [closeModal])

  const handleUpdateButtonClick = useCallback(async () => {
    closeModal()
  }, [closeModal])
  return (
    <>
      <Dialog onClose={handleClose} open={open} maxWidth={"md"}>
        <DialogTitle>支払いの編集</DialogTitle>
        <DialogContent>{/* TODO: 支払いフォーム */}</DialogContent>
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
