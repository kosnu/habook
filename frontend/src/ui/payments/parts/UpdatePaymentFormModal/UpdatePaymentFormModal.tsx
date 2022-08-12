import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material"
import React from "react"

interface UpdatePaymentFormModalProps {
  open: boolean
  onClose: () => void
}

export function UpdatePaymentFormModal({
  open,
  onClose,
}: UpdatePaymentFormModalProps) {
  function handleClose() {
    onClose()
  }

  async function handleUpdateButtonClick() {
    // await updatePayment()
    onClose()
  }

  return (
    <>
      <Dialog
        onClose={handleClose}
        open={open}
        maxWidth={"md"}
        PaperProps={{ style: { width: "640px" } }}
      >
        <DialogTitle>支払いの編集</DialogTitle>
        <DialogContent>{/*<UpdatePaymentForm />*/}</DialogContent>
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
