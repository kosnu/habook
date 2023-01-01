import { useCallback } from "react"
import { useDeletePaymentMutation } from "~/graphql/types"
import { useLoginUser } from "~/ui/common/hooks"

export function useDeletePayment() {
  const { userId } = useLoginUser()
  const [deletePaymentMutation] = useDeletePaymentMutation()

  const deletePayment = useCallback(
    async (paymentId: string) => {
      await deletePaymentMutation({
        variables: { id: paymentId, userId: userId },
        refetchQueries: "active",
      })
    },
    [deletePaymentMutation, userId],
  )

  return {
    deletePayment: deletePayment,
  }
}
