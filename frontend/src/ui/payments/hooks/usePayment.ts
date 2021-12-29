import { ApolloError } from "@apollo/client"
import { atom, useRecoilState } from "recoil"
import {
  Payments_PaymentFragment,
  useDeletePaymentMutation,
} from "src/graphql/types"
import { useSuccessSnackbar } from "src/ui/common/components/SuccessSnackBar"
import { useWarningSnackbar } from "src/ui/common/components/WarningSnackBar"
import { useLoginUser } from "src/ui/common/hooks/useLoginUser"
import { useAmountTextField } from "./useAmountTextField"
import { useCategorySelect } from "./useCategorySelect"
import { useNumberOfProductSelect } from "./useNumberOfProductSelect"
import { usePaidOnDatePicker } from "./usePaidOnDatePicker"
import { useTaxSelect } from "./useTaxSelect"

const selectedPaymentState = atom<Payments_PaymentFragment | null>({
  key: "selected-payment-state",
  default: null,
})

export function usePayment() {
  const { userId } = useLoginUser()
  const [payment, setPayment] = useRecoilState(selectedPaymentState)
  const { changePaidOnDate } = usePaidOnDatePicker()
  const { changeCategory } = useCategorySelect()
  const { changeNumberOfProduct } = useNumberOfProductSelect()
  const { changeTaxIncluded } = useTaxSelect()
  const { changeAmount } = useAmountTextField()
  const [deletePayment] = useDeletePaymentMutation()
  const { openWarningSnackbar } = useWarningSnackbar()
  const { openSuccessSnackbar } = useSuccessSnackbar()

  function handlePaymentSelect(payment: Payments_PaymentFragment) {
    setPayment(payment)
    // TODO: InitialStateでどうにかする
    changePaidOnDate(new Date(payment.paidOn))
    changeCategory(payment.category.id)
    changeNumberOfProduct(payment.numberOfProduct)
    changeTaxIncluded(payment.taxIncluded)
    changeAmount(payment.amount)
  }

  async function handlePaymentDelete() {
    try {
      if (payment) {
        await deletePayment({ variables: { id: payment.id, userId: userId } })
        openSuccessSnackbar("支払いを削除しました")
      }
    } catch (e) {
      console.error(e)
      if (e instanceof ApolloError) {
        openWarningSnackbar(e.message)
      }
    }
  }

  return {
    selectedPayment: payment,
    selectPayment: handlePaymentSelect,
    deletePayment: handlePaymentDelete,
  }
}
