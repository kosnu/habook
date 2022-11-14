import { useCallback } from "react"
import { useBool } from "~/ui/common/hooks/useBool"

const updateCategoryModalKey = "update-category-modal-key"

export function useCategoryFormModal() {
  const { bool, changeTrue, changeFalse } = useBool(updateCategoryModalKey)

  const openModal = useCallback(() => {
    changeTrue()
  }, [changeTrue])

  const closeModal = useCallback(() => {
    changeFalse()
  }, [changeFalse])

  return { open: bool, openModal: openModal, closeModal: closeModal }
}
