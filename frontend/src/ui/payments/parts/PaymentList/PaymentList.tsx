import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material"
import React from "react"
import { LoadingCircular } from "src/ui/common/components/LoadingCircular"
import { SuccessSnackBar } from "src/ui/common/components/SuccessSnackBar"
import { WarningSnackBar } from "src/ui/common/components/WarningSnackBar"
import { useLoginUser } from "src/ui/common/hooks/useLoginUser"
import { PaymentItem } from "../PaymentItem"
import { UpdatePaymentFormModal } from "../UpdatePaymentFormModal"
import { usePayments } from "./usePayments"
import { useUpdatePaymentFormModal } from "./useUpdatePaymentFormModal"

export function PaymentList() {
  const { userId } = useLoginUser()
  const { payments, loading, error } = usePayments(userId)
  const { open, closeModal } = useUpdatePaymentFormModal()

  function handleUpdatePaymentFormModalClose() {
    closeModal()
  }

  // TODO: エラーが発生したときの実装をする
  if (error) return <Typography>Error</Typography>

  return (
    <>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>商品名</TableCell>
              <TableCell align={"right"}>カテゴリー</TableCell>
              <TableCell align={"right"}>値段</TableCell>
              <TableCell align={"right"}>個数</TableCell>
              <TableCell align={"right"}>購入日</TableCell>
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {payments.map((payment) => {
              return <PaymentItem key={payment.id} payment={payment} />
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <SuccessSnackBar />
      <WarningSnackBar />
      <LoadingCircular loading={loading} />
      <UpdatePaymentFormModal
        open={open}
        onClose={handleUpdatePaymentFormModalClose}
      />
    </>
  )
}
