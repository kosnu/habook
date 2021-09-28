import { atom, useRecoilState, useResetRecoilState } from "recoil"

interface AmountForm {
  taxIncluded: boolean
  amount: number
}

const amountFormAtom = atom<AmountForm>({
  key: "payments-amount-form-atom",
  default: { taxIncluded: false, amount: 0 },
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

  return {
    taxIncluded: value.taxIncluded,
    amount: value.amount,
    changeTaxIncluded: handleTaxIncludedChange,
    changeAmount: handleAmountChange,
    resetAmountForm: resetAmountForm,
  }
}
