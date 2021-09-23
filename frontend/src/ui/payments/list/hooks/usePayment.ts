import { atom, useRecoilState } from "recoil"
import {
  Payments_PaymentFragmentFragment,
  useDeletePaymentMutation,
} from "../../../../graphql/types"
import { useSuccessSnackbar } from "../../../common/components/SuccessSnackBar"
import { useWarningSnackbar } from "../../../common/components/WarningSnackBar"
import { useLoginUser } from "../../../common/hooks/useLoginUser"

const selectedPaymentState = atom<Payments_PaymentFragmentFragment | null>({
  key: "selected-payment-state",
  default: null,
})

export function usePayment() {
  const { userId } = useLoginUser()
  const [payment, setPayment] = useRecoilState(selectedPaymentState)
  const [deletePayment] = useDeletePaymentMutation()
  const { openWarningSnackbar } = useWarningSnackbar()
  const { openSuccessSnackbar } = useSuccessSnackbar()

  function handlePaymentSelect(payment: Payments_PaymentFragmentFragment) {
    setPayment(payment)
  }

  async function handlePaymentUpdate() {
    try {
      // TODO: Validation
      // TODO: UpdatePayment
      openSuccessSnackbar("支払いを更新しました")
    } catch (e) {
      openWarningSnackbar(e.message)
    }
  }

  async function handlePaymentDelete() {
    try {
      if (payment) {
        await deletePayment({ variables: { id: payment.id, userId: userId } })
        openSuccessSnackbar("支払いを削除しました")
      }
    } catch (e) {
      openWarningSnackbar(e.message)
    }
  }

  return {
    selectedPayment: payment,
    selectPayment: handlePaymentSelect,
    updatePayment: handlePaymentUpdate,
    deletePayment: handlePaymentDelete,
  }
}
