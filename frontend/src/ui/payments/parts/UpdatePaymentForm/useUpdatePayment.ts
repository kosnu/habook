import { useCallback } from "react"
import { useUpdatePaymentMutation } from "~/graphql/types"
import { useLoginUser } from "~/ui/common/hooks"
import { dateToString } from "~/ui/common/utils"

export function useUpdatePayment() {
  const { userId } = useLoginUser()
  const [updatePayment] = useUpdatePaymentMutation()

  const handleUpdatePayment = useCallback(
    async (
      paymentId: string,
      paidOnDate: Date,
      categoryId: string,
      numberOfProduct: number,
      amount: number,
    ) => {
      await updatePayment({
        variables: {
          userId: userId,
          id: paymentId,
          paidOnDate: dateToString(paidOnDate),
          categoryId: categoryId,
          numberOfProduct: numberOfProduct,
          amount: amount,
        },
      })
    },
    [updatePayment, userId],
  )

  return {
    updatePayment: handleUpdatePayment,
  }
}
