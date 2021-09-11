import { IconButton, TableCell, TableRow } from "@material-ui/core"
import { MoreVert as MoreVertIcon } from "@material-ui/icons"
import { format } from "date-fns"
import React from "react"
import { Payments_PaymentFragmentFragment } from "../../../../graphql/types"

interface PaymentItemProps {
  payment: Payments_PaymentFragmentFragment
  onMenuButtonClick: (
    event: React.MouseEvent<HTMLButtonElement>,
    payment: Payments_PaymentFragmentFragment,
  ) => void
}

export function PaymentItem({ payment, onMenuButtonClick }: PaymentItemProps) {
  function handleMenuButtonClick(event: React.MouseEvent<HTMLButtonElement>) {
    onMenuButtonClick(event, payment)
  }

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
            onClick={handleMenuButtonClick}
          >
            <MoreVertIcon />
          </IconButton>
        </TableCell>
      </TableRow>
    </>
  )
}
