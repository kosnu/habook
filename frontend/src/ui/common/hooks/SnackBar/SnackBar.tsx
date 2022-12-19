import React from "react"
import { Alert, AlertColor, Snackbar } from "@mui/material"

interface SnackBarProps {
  open: boolean
  message: string
  severity: AlertColor
  onClose: () => void
}

export function SnackBar({ open, message, severity, onClose }: SnackBarProps) {
  return (
    <>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={onClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert onClose={onClose} severity={severity}>
          {message}
        </Alert>
      </Snackbar>
    </>
  )
}
