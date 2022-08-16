import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material"
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

  const handleUpdateButtonClick = useCallback(async () => {
    // await updatePayment()
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
          <UpdatePaymentForm payment={payment} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color={"primary"}>
            キャンセル
          </Button>
          <Button
            color={"primary"}
            variant={"contained"}
            // disabled={invalid}
            onClick={handleUpdateButtonClick}
          >
            支払いを更新する
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
