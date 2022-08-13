import { MoreVert as MoreVertIcon } from "@mui/icons-material"
import { IconButton, TableCell, TableRow } from "@mui/material"
import React, { useCallback } from "react"
import { Payments_PaymentFragment } from "src/graphql/types"
import { dateFormatter } from "src/ui/common/utils/formatter"
import { usePaymentOperationMenu } from "./usePaymentOperationMenu"

interface PaymentItemProps {
  payment: Payments_PaymentFragment
}

export function PaymentItem({ payment }: PaymentItemProps) {
  const { openPaymentOperationMenu, renderPaymentOperationMenu } =
    usePaymentOperationMenu()

  const handleMenuButtonClick = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      openPaymentOperationMenu(event, payment)
    },
    [payment, openPaymentOperationMenu],
  )

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
      {renderPaymentOperationMenu()}
    </>
  )
}
