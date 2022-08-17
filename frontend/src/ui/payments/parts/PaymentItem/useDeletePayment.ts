import { useCallback } from "react"
import { useDeletePaymentMutation } from "../../../../graphql/types"
import { useLoginUser } from "../../../common/hooks/useLoginUser"

export function useDeletePayment() {
  const { userId } = useLoginUser()
  const [deletePayment] = useDeletePaymentMutation()

  const handleDeletePayment = useCallback(
    async (paymentId: string) => {
      await deletePayment({
        variables: { id: paymentId, userId: userId },
        refetchQueries: "active",
      })
    },
    [deletePayment, userId],
  )

  return {
    deletePayment: handleDeletePayment,
  }
}
