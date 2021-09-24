import { Create as CreateIcon } from "@mui/icons-material"
import { Button } from "@mui/material"
import React from "react"

interface CreatePaymentButtonProps {
  onClick: () => void
}

export function CreatePaymentButton({ onClick }: CreatePaymentButtonProps) {
  return (
    <>
      <Button
        variant={"contained"}
        color={"primary"}
        startIcon={<CreateIcon />}
        onClick={onClick}
      >
        支払いの入力を確定する
      </Button>
    </>
  )
}
