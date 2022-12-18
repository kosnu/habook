import { useBool } from "~/ui/common/hooks"

const paymentFormModalKey = "payment-form-modal-key"

export function useUpdatePaymentFormModal() {
  const { bool, changeTrue, changeFalse } = useBool(paymentFormModalKey)

  function openModal() {
    changeTrue()
  }

  function closeModal() {
    changeFalse()
  }

  return { open: bool, openModal: openModal, closeModal: closeModal }
}
