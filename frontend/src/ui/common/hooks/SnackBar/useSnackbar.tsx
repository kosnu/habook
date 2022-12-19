import { useCallback } from "react"
import { AlertColor } from "@mui/material"
import produce from "immer"
import { atomFamily, useRecoilState } from "recoil"
import { SnackBar as SnackBarComponent } from "./SnackBar"

interface Snackbar {
  open: boolean
  alert: Alert
}

const snackbarAtomFamily = atomFamily<Snackbar, string>({
  key: "snackbar-atom-family",
  default: {
    open: false,
    alert: { message: "", severity: "info" },
  },
})

export interface Alert {
  message: string
  severity: AlertColor
}

interface UseSnackbarReturn {
  SnackBar: () => JSX.Element
  openSnackBar: ({ message, severity }: Alert) => void
}

export function useSnackbar(key: string): UseSnackbarReturn {
  const [state, setState] = useRecoilState(snackbarAtomFamily(key))

  const openSnackBar = useCallback(
    (alert: Alert) => {
      setState(
        produce((draft) => {
          draft.open = true
          draft.alert = alert
        }),
      )
    },
    [setState],
  )

  const closeSnackBar = useCallback(() => {
    setState(
      produce((draft) => {
        draft.open = false
      }),
    )
  }, [setState])

  const SnackBar = useCallback((): JSX.Element => {
    return (
      <SnackBarComponent
        open={state.open}
        message={state.alert.message}
        severity={state.alert.severity}
        onClose={closeSnackBar}
      />
    )
  }, [state, closeSnackBar])

  return {
    SnackBar: SnackBar,
    openSnackBar: openSnackBar,
  }
}
