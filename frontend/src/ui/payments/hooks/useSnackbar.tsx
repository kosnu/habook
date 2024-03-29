import { useCallback } from "react"
import { useSnackbar as useCommonSnackbar } from "~/ui/common/hooks"

interface UseSnackbarReturn {
  SnackBar: () => JSX.Element
  openSuccessSnackBar: (message: string) => void
  openWarningSnackBar: (message: string) => void
}

export function useSnackbar(): UseSnackbarReturn {
  const { openSnackBar, SnackBar } = useCommonSnackbar("payments-atom")

  const openSuccessSnackBar = useCallback(
    (message: string) => {
      openSnackBar({ message: message, severity: "success" })
    },
    [openSnackBar],
  )

  const openWarningSnackBar = useCallback(
    (message: string) => {
      openSnackBar({ message: message, severity: "warning" })
    },
    [openSnackBar],
  )

  return {
    SnackBar: SnackBar,
    openSuccessSnackBar: openSuccessSnackBar,
    openWarningSnackBar: openWarningSnackBar,
  }
}
