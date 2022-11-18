import { Button, ButtonProps, CircularProgress } from "@mui/material"
import React from "react"

type LoadingButtonProps = ButtonProps

export function LoadingButton({ children, ...props }: LoadingButtonProps) {
  return (
    <>
      <Button
        {...props}
        disabled
        variant={"contained"}
        startIcon={<CircularProgress size={"1rem"} />}
      >
        {children}
      </Button>
    </>
  )
}
