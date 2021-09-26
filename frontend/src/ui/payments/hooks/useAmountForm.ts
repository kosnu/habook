import { atom, useRecoilState, useResetRecoilState } from "recoil"

interface AmountForm {
  taxIncluded: boolean
  amount: number
  numberOfProduct: number
}

const amountFormAtom = atom<AmountForm>({
  key: "payments-amount-form-atom",
  default: { taxIncluded: false, amount: 0, numberOfProduct: 1 },
})

export function useAmountForm() {
  const [value, setValue] = useRecoilState(amountFormAtom)
  const resetAmountForm = useResetRecoilState(amountFormAtom)

  function handleTaxIncludedChange(taxIncluded: boolean) {
    setValue((currVal) => ({
      ...currVal,
      taxIncluded: taxIncluded,
    }))
  }

  function handleAmountChange(amount: number) {
    setValue((currVal) => ({
      ...currVal,
      amount: amount,
    }))
  }

  function handleNumberOfProductChange(numberOfProduct: number) {
    setValue((currVal) => ({
      ...currVal,
      numberOfProduct: numberOfProduct,
    }))
  }

  return {
    taxIncluded: value.taxIncluded,
    amount: value.amount,
    numberOfProduct: value.numberOfProduct,
    changeTaxIncluded: handleTaxIncludedChange,
    changeAmount: handleAmountChange,
    changeNumberOfProduct: handleNumberOfProductChange,
    resetAmountForm: resetAmountForm,
  }
}
