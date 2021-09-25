import { Create as CreateIcon } from "@mui/icons-material"
import { Button } from "@mui/material"
import React from "react"

interface CreatePaymentButtonProps {
  invalid: boolean
  onClick: () => void
}

export function CreatePaymentButton({
  invalid,
  onClick,
}: CreatePaymentButtonProps) {
  return (
    <>
      <Button
        variant={"contained"}
        color={"primary"}
        startIcon={<CreateIcon />}
        disabled={invalid}
        onClick={onClick}
      >
        支払いの入力を確定する
      </Button>
    </>
  )
}
