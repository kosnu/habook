import { ApolloError } from "@apollo/client"
import { useUpdatePaymentMutation } from "../../../graphql/types"
import { useSuccessSnackbar } from "../../common/components/molecules/SuccessSnackBar"
import { useWarningSnackbar } from "../../common/components/molecules/WarningSnackBar"
import { useLoginUser } from "../../common/hooks/useLoginUser"
import { dateToString } from "../../common/utils/formatter"
import { useAmountForm } from "./useAmountForm"
import { useCategorySelect } from "./useCategorySelect"
import { usePaidOnDate } from "./usePaidOnDate"
import { usePayment } from "./usePayment"

export function useUpdatePaymentForm() {
  const { userId } = useLoginUser()
  const { selectedPayment } = usePayment()
  const { paidOnDate, resetPaidOnDate } = usePaidOnDate()
  const {
    categoryId,
    categorySelectValidation,
    validateCategory,
    resetCategorySelect,
  } = useCategorySelect()
  const { taxIncluded, amount, numberOfProduct, resetAmountForm } =
    useAmountForm()
  const [updatePayment] = useUpdatePaymentMutation()
  const { openSuccessSnackbar } = useSuccessSnackbar()
  const { openWarningSnackbar } = useWarningSnackbar()

  const invalid = categorySelectValidation.isError

  function handleUpdateFormValidate() {
    validateCategory()
  }

  async function handlePaymentUpdate() {
    if (invalid || !categoryId || !selectedPayment) {
      openWarningSnackbar("入力が正しくありません")

      return
    }

    try {
      await updatePayment({
        variables: {
          id: selectedPayment.id,
          userId: userId,
          paidOnDate: dateToString(paidOnDate),
          categoryId: categoryId,
          taxIncluded: taxIncluded,
          amount: amount,
          numberOfProduct: numberOfProduct,
        },
      })
      openSuccessSnackbar("支払い内容の更新できました")
      resetForm()
    } catch (e) {
      console.error(e)
      if (e instanceof ApolloError) {
        openWarningSnackbar(e.message)
      }
    }
  }

  function resetForm() {
    resetPaidOnDate()
    resetCategorySelect()
    resetAmountForm()
  }

  return {
    invalid: invalid,
    validateUpdateForm: handleUpdateFormValidate,
    updatePayment: handlePaymentUpdate,
    resetForm: resetForm,
  }
}
