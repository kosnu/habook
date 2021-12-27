import { useBool } from "src/ui/common/hooks/useBool"

const updateCategoryModalKey = "update-category-modal-key"

export function useCategoryFormModal() {
  const { bool, changeTrue, changeFalse } = useBool(updateCategoryModalKey)

  function openModal() {
    changeTrue()
  }

  function closeModal() {
    changeFalse()
  }

  return { open: bool, openModal: openModal, closeModal: closeModal }
}
