import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material"
import React from "react"
import { usePaymentFormModal } from "../../hooks/usePaymentFormModal"
import { useUpdatePaymentForm } from "../../hooks/useUpdatePaymentForm"
import { UpdatePaymentForm } from "./UpdatePaymentForm"

export function PaymentFormModal() {
  const { open, closeModal } = usePaymentFormModal()
  const { invalid, validateUpdateForm, updatePayment } = useUpdatePaymentForm()

  function handleClose() {
    closeModal()
  }

  async function handleUpdateButtonClick() {
    validateUpdateForm()
    await updatePayment()
    closeModal()
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
        <DialogContent>
          <UpdatePaymentForm />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color={"primary"}>
            キャンセル
          </Button>
          <Button
            color={"primary"}
            variant={"contained"}
            disabled={invalid}
            onClick={handleUpdateButtonClick}
          >
            支払いを更新する
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
