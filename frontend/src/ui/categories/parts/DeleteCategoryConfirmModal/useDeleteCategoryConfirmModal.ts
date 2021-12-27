import { useBool } from "src/ui/common/hooks/useBool"

const deleteCategoryConfirmModalKey = "delete-category-confirm-modal-key"

export function useDeleteCategoryConfirmModal() {
  const { bool, changeTrue, changeFalse } = useBool(
    deleteCategoryConfirmModalKey,
  )

  function openModal() {
    changeTrue()
  }

  function closeModal() {
    changeFalse()
  }

  return { open: bool, openModal: openModal, closeModal: closeModal }
}
