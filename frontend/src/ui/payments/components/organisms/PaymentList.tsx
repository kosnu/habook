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
import { Payments_PaymentFragment, usePaymentsQuery } from "src/graphql/types"
import { LoadingCircular } from "src/ui/common/components/LoadingCircular"
import { SuccessSnackBar } from "src/ui/common/components/SuccessSnackBar"
import { WarningSnackBar } from "src/ui/common/components/WarningSnackBar"
import { useLoginUser } from "src/ui/common/hooks/useLoginUser"
import { usePayment } from "../../hooks/usePayment"
import { usePaymentFormModal } from "../../hooks/usePaymentFormModal"
import { usePaymentOperationMenu } from "../../hooks/usePaymentOperationMenu"
import { PaymentItem } from "../molecules/PaymentItem"
import { PaymentOperationMenu } from "../molecules/PaymentOperationMenu"
import { PaymentFormModal } from "./PaymentFormModal"

export function PaymentList() {
  const { userId } = useLoginUser()
  const { menuAnchorEl, openMenu, closeMenu } = usePaymentOperationMenu()
  const { selectPayment, deletePayment } = usePayment()
  const { openModal } = usePaymentFormModal()

  const { data, loading, error, refetch } = usePaymentsQuery({
    variables: { userId: userId, limit: 30 },
  })

  // TODO: データがないときの画面表示を実装する
  if (data === undefined && !loading) return <Typography>Error</Typography>

  if (data === undefined) return <></> // dataのundefinedを除去

  // TODO: エラーが発生したときの実装をする
  if (error) return <Typography>Error</Typography>

  // const pageInfo = data.payments.pageInfo
  const payments = data.payments.edges
    .filter((value): value is NonNullable<typeof value> => !!value)
    .map((edge) => edge.node)

  function handleMenuButtonClick(
    event: React.MouseEvent<HTMLButtonElement>,
    payment: Payments_PaymentFragment,
  ) {
    openMenu(event)
    selectPayment(payment)
  }

  function handleMenuClose() {
    closeMenu()
  }

  function handleEditButtonClick() {
    openModal()
    closeMenu()
  }

  async function handleDeleteButtonClick() {
    try {
      await deletePayment()
      await refetch()
    } catch (e) {
      console.error(e)
    }
    closeMenu()
  }

  // TODO: ページネーションをできるようにする
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
            {payments.map((payment, index) => {
              return (
                <PaymentItem
                  key={index}
                  payment={payment}
                  onMenuButtonClick={handleMenuButtonClick}
                />
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <SuccessSnackBar />
      <WarningSnackBar />
      <LoadingCircular loading={loading} />
      <PaymentFormModal />
      <PaymentOperationMenu
        anchorElement={menuAnchorEl}
        onMenuClose={handleMenuClose}
        onEditButtonClick={handleEditButtonClick}
        onDeleteButtonClick={handleDeleteButtonClick}
      />
    </>
  )
}
