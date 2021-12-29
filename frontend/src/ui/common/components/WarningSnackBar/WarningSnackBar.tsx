import { Alert, Snackbar } from "@mui/material"
import React from "react"
import { useWarningSnackbar } from "./useWarningSnackbar"

export function WarningSnackBar() {
  const { open, message, closeWarningSnackbar } = useWarningSnackbar()

  return (
    <>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={closeWarningSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert onClose={closeWarningSnackbar} severity={"warning"}>
          {message}
        </Alert>
      </Snackbar>
    </>
  )
}
