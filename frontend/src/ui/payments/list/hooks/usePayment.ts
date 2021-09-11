import { atom, useRecoilState } from "recoil"
import { Payments_PaymentFragmentFragment } from "../../../../graphql/types"
import { useSuccessSnackbar } from "../../../common/components/SuccessSnackBar"
import { useWarningSnackbar } from "../../../common/components/WarningSnackBar"

const selectedPaymentState = atom<Payments_PaymentFragmentFragment | null>({
  key: "selected-payment-state",
  default: null,
})

export function usePayment() {
  const [payment, setPayment] = useRecoilState(selectedPaymentState)
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
      // TODO: DeletePayment
      openSuccessSnackbar("支払いを削除しました")
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
