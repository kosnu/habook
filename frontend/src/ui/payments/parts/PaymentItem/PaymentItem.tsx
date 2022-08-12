import { MoreVert as MoreVertIcon } from "@mui/icons-material"
import { IconButton, TableCell, TableRow } from "@mui/material"
import React from "react"
import { Payments_PaymentFragment } from "src/graphql/types"
import { dateFormatter } from "src/ui/common/utils/formatter"

interface PaymentItemProps {
  payment: Payments_PaymentFragment
  onMenuButtonClick: (
    event: React.MouseEvent<HTMLButtonElement>,
    payment: Payments_PaymentFragment,
  ) => void
}

export function PaymentItem({ payment, onMenuButtonClick }: PaymentItemProps) {
  function handleMenuButtonClick(event: React.MouseEvent<HTMLButtonElement>) {
    onMenuButtonClick(event, payment)
  }

  return (
    <>
      <TableRow key={payment.id}>
        <TableCell component={"th"} scope={"row"}>
          {payment.product.name}
        </TableCell>
        <TableCell align={"right"}>{payment.category.name}</TableCell>
        <TableCell align={"right"}>
          {payment.taxIncluded ? "（税込）" : "（税抜）"}
          {payment.amount.toLocaleString("ja-JP", {
            style: "currency",
            currency: "JPY",
          })}
        </TableCell>
        <TableCell align={"right"}>{payment.numberOfProduct}</TableCell>
        <TableCell align={"right"}>{dateFormatter(payment.paidOn)}</TableCell>
        <TableCell align={"right"}>
          <IconButton
            edge={"end"}
            aria-label={"payment-menu-more"}
            onClick={handleMenuButtonClick}
            size={"large"}
          >
            <MoreVertIcon />
          </IconButton>
        </TableCell>
      </TableRow>
    </>
  )
}
