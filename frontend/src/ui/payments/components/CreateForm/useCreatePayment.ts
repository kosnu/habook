import { useCreatePaymentMutation } from "~/graphql/types"
import { useLoginUser } from "~/ui/common/hooks"
import { dateToString } from "~/ui/common/utils"

export function useCreatePayment() {
  const { userId } = useLoginUser()
  const [createPaymentMutation] = useCreatePaymentMutation()

  async function createPayment(
    paidOnDate: Date,
    categoryId: string,
    productName: string,
    numberOfProduct: number,
    amount: number,
  ) {
    await createPaymentMutation({
      variables: {
        userId: userId,
        paidOnDate: dateToString(paidOnDate),
        categoryId: categoryId,
        productName: productName,
        numberOfProduct: numberOfProduct,
        amount: amount,
      },
    })
  }

  return {
    createPayment: createPayment,
  }
}
