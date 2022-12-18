import { useCallback } from "react"
import { useBool } from "~/ui/common/hooks"

const deleteCategoryConfirmModalKey = "delete-category-confirm-modal-key"

export function useDeleteCategoryConfirmModal() {
  const { bool, changeTrue, changeFalse } = useBool(
    deleteCategoryConfirmModalKey,
  )

  const openModal = useCallback(() => {
    changeTrue()
  }, [changeTrue])

  const closeModal = useCallback(() => {
    changeFalse()
  }, [changeFalse])

  return { open: bool, openModal: openModal, closeModal: closeModal }
}
