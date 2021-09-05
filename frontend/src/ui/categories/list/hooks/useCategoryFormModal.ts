import { useBool } from "../../../common/hooks/useBool"

const categoryFormModalKey = "category-form-modal-key"

export function useCategoryFormModal() {
  const { bool, changeTrue, changeFalse } = useBool(categoryFormModalKey)

  function openModal() {
    changeTrue()
  }

  function closeModal() {
    changeFalse()
  }

  return { open: bool, openModal: openModal, closeModal: closeModal }
}
