import React from "react"
import { Button, ButtonProps, CircularProgress } from "@mui/material"

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
