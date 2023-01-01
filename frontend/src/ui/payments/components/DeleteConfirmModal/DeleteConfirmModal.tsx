import React, { useCallback } from "react"
import { ApolloError } from "@apollo/client"
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material"
import { useSnackbar } from "~/ui/payments/hooks"
import { useDeletePayment } from "./useDeletePayment"

interface DeleteConfirmModalProps {
  open: boolean
  paymentId: string
  onClose: () => void
}

export function DeleteConfirmModal({
  open,
  paymentId,
  onClose,
}: DeleteConfirmModalProps) {
  const { deletePayment } = useDeletePayment()
  const { openSuccessSnackBar, openWarningSnackBar } = useSnackbar()

  const handleClose = useCallback(() => {
    onClose()
  }, [onClose])

  const handleNegativeButtonClick = useCallback(() => {
    onClose()
  }, [onClose])

  const handlePositiveButtonClick = useCallback(async () => {
    try {
      await deletePayment(paymentId)
      openSuccessSnackBar("支払いの削除ができました")
      onClose()
    } catch (e) {
      console.error(e)
      if (e instanceof ApolloError) {
        openWarningSnackBar(e.message)
      }
    }
  }, [
    deletePayment,
    onClose,
    openSuccessSnackBar,
    openWarningSnackBar,
    paymentId,
  ])

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby={"alert-dialog-title"}
        aria-describedby={"alert-dialog-description"}
      >
        <DialogTitle id="alert-dialog-title">
          {"支払い情報を削除しますか？"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id={"alert-dialog-description"}>
            削除すると元に戻すことはできません。
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleNegativeButtonClick}>いいえ</Button>
          <Button onClick={handlePositiveButtonClick} autoFocus>
            削除する
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
