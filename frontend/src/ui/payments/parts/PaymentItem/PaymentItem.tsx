import { MoreVert as MoreVertIcon } from "@mui/icons-material"
import { IconButton, TableCell, TableRow } from "@mui/material"
import React, { useCallback } from "react"
import { dateFormatter } from "~/ui/common/utils/formatter"
import { Payment } from "../../types"
import { usePaymentOperationMenu } from "./usePaymentOperationMenu"

interface PaymentItemProps {
  payment: Payment
}

export function PaymentItem({ payment }: PaymentItemProps) {
  const { openPaymentOperationMenu, renderPaymentOperationMenu } =
    usePaymentOperationMenu(payment)

  const handleMenuButtonClick = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      openPaymentOperationMenu(event)
    },
    [openPaymentOperationMenu],
  )

  return (
    <>
      <TableRow key={payment.id}>
        <TableCell component={"th"} scope={"row"}>
          {payment.product.name}
        </TableCell>
        <TableCell align={"right"}>{payment.category.name}</TableCell>
        <TableCell align={"right"}>
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
