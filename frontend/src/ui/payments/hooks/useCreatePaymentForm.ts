import { ApolloError } from "@apollo/client"
import { useCreatePaymentMutation } from "../../../graphql/types"
import { useSuccessSnackbar } from "../../common/components/molecules/SuccessSnackBar"
import { useWarningSnackbar } from "../../common/components/molecules/WarningSnackBar"
import { useLoginUser } from "../../common/hooks/useLoginUser"
import { dateToString } from "../../common/utils/formatter"
import { useAmountTextField } from "./useAmountTextField"
import { useCategorySelect } from "./useCategorySelect"
import { useNumberOfProductSelect } from "./useNumberOfProductSelect"
import { usePaidOnDatePicker } from "./usePaidOnDatePicker"
import { useProductNameAutocomplete } from "./useProductNameAutocomplete"
import { useTaxSelect } from "./useTaxSelect"

export function useCreatePaymentForm() {
  const { userId } = useLoginUser()
  const { paidOnDate, resetPaidOnDatePicker } = usePaidOnDatePicker()
  const {
    categoryId,
    categorySelectValidation,
    validateCategory,
    resetCategorySelect,
  } = useCategorySelect()
  const {
    productName,
    productNameAutocompleteValidation,
    validateProductName,
    resetProductNameAutocomplete,
  } = useProductNameAutocomplete()
  const { numberOfProduct, resetNumberOfProductSelect } =
    useNumberOfProductSelect()
  const { taxIncluded, resetTaxSelect } = useTaxSelect()
  const { amount, resetAmountForm } = useAmountTextField()
  const [createPayment] = useCreatePaymentMutation()
  const { openSuccessSnackbar } = useSuccessSnackbar()
  const { openWarningSnackbar } = useWarningSnackbar()

  const invalid =
    categorySelectValidation.isError ||
    productNameAutocompleteValidation.isError

  function handleCreateFormValidate() {
    validateCategory()
    validateProductName()
  }

  async function handlePaymentCreate() {
    if (invalid || !categoryId || !productName) {
      openWarningSnackbar("入力が正しくありません")

      return
    }

    try {
      await createPayment({
        variables: {
          userId: userId,
          paidOnDate: dateToString(paidOnDate),
          categoryId: categoryId,
          productName: productName,
          taxIncluded: taxIncluded,
          amount: amount,
          numberOfProduct: numberOfProduct,
        },
      })
      openSuccessSnackbar("支払いが作成できました")
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
    resetProductNameAutocomplete()
    resetNumberOfProductSelect()
    resetTaxSelect()
    resetAmountForm()
  }

  return {
    invalid: invalid,
    validateCreateForm: handleCreateFormValidate,
    createPayment: handlePaymentCreate,
    resetForm: resetForm,
  }
}
