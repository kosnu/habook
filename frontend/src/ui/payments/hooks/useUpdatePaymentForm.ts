import { ApolloError } from "@apollo/client"
import { useUpdatePaymentMutation } from "src/graphql/types"
import { useSuccessSnackbar } from "src/ui/common/components/SuccessSnackBar"
import { useWarningSnackbar } from "src/ui/common/components/WarningSnackBar"
import { useLoginUser } from "../../common/hooks/useLoginUser"
import { dateToString } from "../../common/utils/formatter"
import { useAmountTextField } from "./useAmountTextField"
import { useCategorySelect } from "./useCategorySelect"
import { useNumberOfProductSelect } from "./useNumberOfProductSelect"
import { usePaidOnDatePicker } from "./usePaidOnDatePicker"
import { usePayment } from "./usePayment"
import { useTaxSelect } from "./useTaxSelect"

export function useUpdatePaymentForm() {
  const { userId } = useLoginUser()
  const { selectedPayment } = usePayment()
  const { paidOnDate, resetPaidOnDatePicker } = usePaidOnDatePicker()
  const {
    categoryId,
    categorySelectValidation,
    validateCategory,
    resetCategorySelect,
  } = useCategorySelect()
  const { numberOfProduct, resetNumberOfProductSelect } =
    useNumberOfProductSelect()
  const { taxIncluded, resetTaxSelect } = useTaxSelect()
  const { amount, resetAmountForm } = useAmountTextField()
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
    resetPaidOnDatePicker()
    resetCategorySelect()
    resetNumberOfProductSelect()
    resetTaxSelect()
    resetAmountForm()
  }

  return {
    invalid: invalid,
    validateUpdateForm: handleUpdateFormValidate,
    updatePayment: handlePaymentUpdate,
    resetForm: resetForm,
  }
}
