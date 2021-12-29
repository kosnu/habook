import { useCallback } from "react"
import { atom, useRecoilState } from "recoil"

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
