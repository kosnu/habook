import { Snackbar } from "@material-ui/core"
import { Alert } from "@material-ui/lab"
import React, { useCallback } from "react"
import { atom, useRecoilState } from "recoil"

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

interface WarningSnackBar {
  open: boolean
  message: string
}

const warningSnackBarState = atom<WarningSnackBar>({
  key: "warning-snackbar-state",
  default: { open: false, message: "" },
})

export function useWarningSnackbar() {
  const [snackbar, setSnackBar] = useRecoilState(warningSnackBarState)

  const openWarningSnackbar = useCallback(
    (message: string) => {
      setSnackBar({ open: true, message: message })
    },
    [setSnackBar],
  )

  const closeWarningSnackbar = useCallback(() => {
    setSnackBar({ open: false, message: "" })
  }, [setSnackBar])

  return {
    ...snackbar,
    openWarningSnackbar,
    closeWarningSnackbar,
  }
}
