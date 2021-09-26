import { useCreatePaymentMutation } from "../../../graphql/types"
import { useSuccessSnackbar } from "../../common/components/molecules/SuccessSnackBar"
import { useWarningSnackbar } from "../../common/components/molecules/WarningSnackBar"
import { useLoginUser } from "../../common/hooks/useLoginUser"
import { dateToString } from "../../common/utils/formatter"
import { useAmountForm } from "./useAmountForm"
import { useCategorySelect } from "./useCategorySelect"
import { usePaidOnDate } from "./usePaidOnDate"
import { useProductNameAutocomplete } from "./useProductNameAutocomplete"

export function useCreatePaymentForm() {
  const { userId } = useLoginUser()
  const { paidOnDate, resetPaidOnDate } = usePaidOnDate()
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
  const { taxIncluded, amount, numberOfProduct, resetAmountForm } =
    useAmountForm()
  const [createPayment] = useCreatePaymentMutation()
  const { openSuccessSnackbar } = useSuccessSnackbar()
  const { openWarningSnackbar } = useWarningSnackbar()

  const invalid =
    categorySelectValidation.isError ||
    productNameAutocompleteValidation.isError

  function validateCreateForm() {
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
      openWarningSnackbar(e.message)
    }
  }

  function resetForm() {
    resetPaidOnDate()
    resetCategorySelect()
    resetProductNameAutocomplete()
    resetAmountForm()
  }

  return {
    invalid: invalid,
    validateCreateForm: validateCreateForm,
    createPayment: handlePaymentCreate,
    resetForm: resetForm,
  }
}
