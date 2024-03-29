import React from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material"
import { LoadingCircular } from "~/ui/common/components"
import { useLoginUser } from "~/ui/common/hooks"
import { PaymentItem } from "../PaymentItem"
import { usePayments } from "./usePayments"

export function PaymentList() {
  const { userId } = useLoginUser()
  const { payments, loading, error } = usePayments(userId)

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
      <LoadingCircular loading={loading} />
    </>
  )
}
