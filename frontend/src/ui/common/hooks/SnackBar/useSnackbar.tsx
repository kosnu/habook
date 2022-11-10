import { AlertColor } from "@mui/material"
import { useCallback, useState } from "react"
import { SnackBar as SnackBarComponent } from "./SnackBar"

interface Alert {
  message: string
  severity: AlertColor
}

interface UseSnackbarReturn {
  SnackBar: () => JSX.Element
  openSnackBar: ({ message, severity }: Alert) => void
}

export function useSnackbar(): UseSnackbarReturn {
  const [open, setOpen] = useState(false)
  const [alert, setAlert] = useState<Alert>({ message: "", severity: "info" })

  const openSnackBar = useCallback((alert: Alert) => {
    setOpen(true)
    setAlert(alert)
  }, [])

  const closeSnackBar = useCallback(() => {
    setOpen(false)
  }, [])

  const SnackBar = useCallback((): JSX.Element => {
    return (
      <SnackBarComponent
        open={open}
        message={alert.message}
        severity={alert.severity}
        onClose={closeSnackBar}
      />
    )
  }, [alert, closeSnackBar, open])

  return {
    SnackBar: SnackBar,
    openSnackBar: openSnackBar,
  }
}
