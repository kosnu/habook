import { useCallback } from "react"
import { useUpdatePaymentMutation } from "~/graphql/types"
import { useLoginUser } from "~/ui/common/hooks"
import { dateToString } from "~/ui/common/utils"

export function useUpdatePayment() {
  const { userId } = useLoginUser()
  const [updatePaymentMutation] = useUpdatePaymentMutation()

  const updatePayment = useCallback(
    async (
      paymentId: string,
      paidOnDate: Date,
      categoryId: string,
      numberOfProduct: number,
      amount: number,
    ) => {
      await updatePaymentMutation({
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
    [updatePaymentMutation, userId],
  )

  return {
    updatePayment: updatePayment,
  }
}
