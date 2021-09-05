import { useCallback } from "react"
import { atom, selector, useRecoilState } from "recoil"

const createPaymentState = atom<CreatePaymentType>({
  key: "create-payment-state",
  default: {
    paidOnDate: new Date(),
    categoryId: "",
    amount: 0,
    taxIncluded: 1,
    numberOfProduct: 1,
    productName: "",
  },
})

interface CreatePaymentType {
  paidOnDate: Date
  categoryId: string
  amount: number
  taxIncluded: number
  numberOfProduct: number
  productName: string
}

interface ReturnType extends CreatePaymentType {
  onPaidOnDateChange: (date: Date | null) => void
  onCategoryIdChange: (categoryId: string) => void
  onAmountChange: (amount: number) => void
  onTaxIncludedSelect: (taxIncluded: number) => void
  onNumberOfProductSelect: (numberOfProduct: number) => void
  onProductNameChange: (productName: string) => void
}

export function useCreatePayment(): ReturnType {
  const [createPaymentParams, setCreatePaymentParams] =
    useRecoilState(createPaymentState)

  const handlePaidOnDateChange = useCallback(
    (date: Date | null) => {
      date &&
        setCreatePaymentParams((currVal) => {
          return {
            ...currVal,
            paidOnDate: date,
          }
        })
    },
    [setCreatePaymentParams],
  )

  const handleCategorySelect = useCallback(
    (categoryId: string) => {
      setCreatePaymentParams((currVal) => {
        return {
          ...currVal,
          categoryId: categoryId,
        }
      })
    },
    [setCreatePaymentParams],
  )

  const handleAmountChange = useCallback(
    (amount: number) => {
      setCreatePaymentParams((currVal) => {
        return {
          ...currVal,
          amount: amount,
        }
      })
    },
    [setCreatePaymentParams],
  )

  const handleTaxIncludedChange = useCallback(
    (taxIncluded: number) => {
      setCreatePaymentParams((currVal) => {
        return {
          ...currVal,
          taxIncluded: taxIncluded,
        }
      })
    },
    [setCreatePaymentParams],
  )

  const handleNumberOfProductChange = useCallback(
    (numberOfProduct: number) => {
      setCreatePaymentParams((currVal) => {
        return {
          ...currVal,
          numberOfProduct: numberOfProduct,
        }
      })
    },
    [setCreatePaymentParams],
  )

  const handleProductNameChange = useCallback(
    (productName: string) => {
      setCreatePaymentParams((currVal) => {
        return {
          ...currVal,
          productName: productName,
        }
      })
    },
    [setCreatePaymentParams],
  )

  return {
    ...createPaymentParams,
    onPaidOnDateChange: handlePaidOnDateChange,
    onCategoryIdChange: handleCategorySelect,
    onAmountChange: handleAmountChange,
    onTaxIncludedSelect: handleTaxIncludedChange,
    onNumberOfProductSelect: handleNumberOfProductChange,
    onProductNameChange: handleProductNameChange,
  }
}

export const createPaymentParamsSelector = selector({
  key: "create-payment-selector",
  get: ({ get }) => {
    return {
      ...get(createPaymentState),
      paidOnDate: get(createPaymentState).paidOnDate.toLocaleString(),
      taxIncluded: !!get(createPaymentState).taxIncluded,
    }
  },
})
