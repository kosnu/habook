import { ApolloError } from "@apollo/client"
import { useCreatePaymentMutation } from "../../../graphql/types"
import { useSuccessSnackbar } from "../../common/components/molecules/SuccessSnackBar"
import { useWarningSnackbar } from "../../common/components/molecules/WarningSnackBar"
import { useLoginUser } from "../../common/hooks/useLoginUser"
import { dateToString } from "../../common/utils/formatter"
import { useAmountForm } from "./useAmountForm"
import { useCategorySelect } from "./useCategorySelect"
import { useNumberOfProduct } from "./useNumberOfProduct"
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
  const { numberOfProduct, resetNumberOfProductSelect } = useNumberOfProduct()
  const { taxIncluded, amount, resetAmountForm } = useAmountForm()
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
    resetPaidOnDate()
    resetCategorySelect()
    resetProductNameAutocomplete()
    resetNumberOfProductSelect()
    resetAmountForm()
  }

  return {
    invalid: invalid,
    validateCreateForm: handleCreateFormValidate,
    createPayment: handlePaymentCreate,
    resetForm: resetForm,
  }
}
