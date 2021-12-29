import { Alert, Snackbar } from "@mui/material"
import React from "react"
import { useSuccessSnackbar } from "./useSuccessSnackbar"

export function SuccessSnackBar() {
  const { open, message, closeSuccessSnackbar } = useSuccessSnackbar()

  return (
    <>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={closeSuccessSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert onClose={closeSuccessSnackbar} severity={"success"}>
          {message}
        </Alert>
      </Snackbar>
    </>
  )
}
