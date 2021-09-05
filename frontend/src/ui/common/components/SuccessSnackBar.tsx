import { Snackbar } from "@material-ui/core"
import { Alert } from "@material-ui/lab"
import React, { useCallback } from "react"
import { atom, useRecoilState } from "recoil"

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

interface SuccessSnackBar {
  open: boolean
  message: string
}

const successSnackBarState = atom<SuccessSnackBar>({
  key: "success-snackbar-state",
  default: { open: false, message: "" },
})

export function useSuccessSnackbar() {
  const [snackbar, setSnackBar] = useRecoilState(successSnackBarState)

  const openSuccessSnackbar = useCallback(
    (message: string) => {
      setSnackBar({ open: true, message: message })
    },
    [setSnackBar],
  )

  const closeSuccessSnackbar = useCallback(() => {
    setSnackBar({ open: false, message: "" })
  }, [setSnackBar])

  return {
    ...snackbar,
    openSuccessSnackbar: openSuccessSnackbar,
    closeSuccessSnackbar: closeSuccessSnackbar,
  }
}
