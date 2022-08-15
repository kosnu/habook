import { useCreatePaymentMutation } from "../../../../graphql/types"
import { useLoginUser } from "../../../common/hooks/useLoginUser"
import { dateToString } from "../../../common/utils/formatter"
import { PaymentFormInput } from "../../types"

export function useCreatePayment() {
  const { userId } = useLoginUser()
  const [createPayment] = useCreatePaymentMutation()

  async function handlePaymentCreate(input: PaymentFormInput) {
    await createPayment({
      variables: {
        userId: userId,
        paidOnDate: dateToString(input.paidOnDate),
        categoryId: input.categoryId,
        productName: input.productName,
        numberOfProduct: input.numberOfProduct,
        taxIncluded: true,
        amount: Number(input.amount),
      },
    })
  }

  return {
    createPayment: handlePaymentCreate,
  }
}
