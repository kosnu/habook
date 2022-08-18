import { useCallback } from "react"
import { useUpdatePaymentMutation } from "src/graphql/types"
import { useLoginUser } from "~/ui/common/hooks/useLoginUser"
import { dateToString } from "~/ui/common/utils/formatter"
import { PaymentFormInput } from "../../types"

export function useUpdatePayment() {
  const { userId } = useLoginUser()
  const [updatePayment] = useUpdatePaymentMutation()

  const handleUpdatePayment = useCallback(
    async (paymentId: string, input: PaymentFormInput) => {
      await updatePayment({
        variables: {
          userId: userId,
          id: paymentId,
          paidOnDate: dateToString(input.paidOnDate),
          categoryId: input.categoryId,
          numberOfProduct: input.numberOfProduct,
          taxIncluded: true,
          amount: Number(input.amount),
        },
      })
    },
    [updatePayment, userId],
  )

  return {
    updatePayment: handleUpdatePayment,
  }
}
