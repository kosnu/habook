import { ApolloError } from "@apollo/client"
import { atom, useRecoilState } from "recoil"
import {
  Payments_PaymentFragment,
  useDeletePaymentMutation,
} from "../../../graphql/types"
import { useSuccessSnackbar } from "../../common/components/molecules/SuccessSnackBar"
import { useWarningSnackbar } from "../../common/components/molecules/WarningSnackBar"
import { useLoginUser } from "../../common/hooks/useLoginUser"
import { useAmountForm } from "./useAmountForm"
import { useCategorySelect } from "./useCategorySelect"
import { usePaidOnDate } from "./usePaidOnDate"
import { useProductForm } from "./useProductForm"

const selectedPaymentState = atom<Payments_PaymentFragment | null>({
  key: "selected-payment-state",
  default: null,
})

export function usePayment() {
  const { userId } = useLoginUser()
  const [payment, setPayment] = useRecoilState(selectedPaymentState)
  const { changePaidOnDate } = usePaidOnDate()
  const { changeCategory } = useCategorySelect()
  const { changeNumberOfProduct } = useProductForm()
  const { changeTaxIncluded, changeAmount } = useAmountForm()
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
