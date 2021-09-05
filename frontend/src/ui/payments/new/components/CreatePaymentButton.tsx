import { Button } from "@material-ui/core"
import { Create as CreateIcon } from "@material-ui/icons"
import React from "react"

interface CreatePaymentButtonProps {
  onClick: () => void
}

export function CreatePaymentButton({ onClick }: CreatePaymentButtonProps) {
  return (
    <>
      <Button
        variant="contained"
        color="primary"
        startIcon={<CreateIcon />}
        onClick={onClick}
      >
        支払いの入力を確定する
      </Button>
    </>
  )
}
