import { useBool } from "../../../common/hooks/useBool"

const paymentFormModalKey = "payment-form-modal-key"

export function usePaymentFormModal() {
  const { bool, changeTrue, changeFalse } = useBool(paymentFormModalKey)

  function openModal() {
    changeTrue()
  }

  function closeModal() {
    changeFalse()
  }

  return { open: bool, openModal: openModal, closeModal: closeModal }
}
