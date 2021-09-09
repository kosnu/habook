import { IconButton, TableCell, TableRow } from "@material-ui/core"
import { MoreVert as MoreVertIcon } from "@material-ui/icons"
import { format } from "date-fns"
import React from "react"
import { Payments_PaymentFragmentFragment } from "../../../../graphql/types"

interface PaymentItemProps {
  payment: Payments_PaymentFragmentFragment
  onMenuButtonClick: (event: React.MouseEvent<HTMLButtonElement>) => void
}

// TODO: 支払いに対するアクションを追加する
export function PaymentItem({ payment, onMenuButtonClick }: PaymentItemProps) {
  return (
    <>
      <TableRow key={payment.id}>
        <TableCell component="th" scope="row">
          {payment.product.name}
        </TableCell>
        <TableCell align="right">{payment.category.name}</TableCell>
        <TableCell align="right">
          {payment.taxIncluded ? "（税込）" : "（税抜）"}
          {payment.amount.toLocaleString("ja-JP", {
            style: "currency",
            currency: "JPY",
          })}
        </TableCell>
        <TableCell align="right">{payment.numberOfProduct}</TableCell>
        <TableCell align="right">
          {format(new Date(payment.paidOn), "yyyy/MM/dd")}
        </TableCell>
        <TableCell align="right">
          <IconButton
            edge="end"
            aria-label="payment-menu-more"
            onClick={onMenuButtonClick}
          >
            <MoreVertIcon />
          </IconButton>
        </TableCell>
      </TableRow>
    </>
  )
}
