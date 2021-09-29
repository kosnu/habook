import { atom, useRecoilState, useResetRecoilState } from "recoil"

const amountTextFieldAtom = atom({
  key: "payments-amount-textfield-atom",
  default: 0,
})

export function useAmountTextField() {
  const [value, setValue] = useRecoilState(amountTextFieldAtom)
  const resetAmountForm = useResetRecoilState(amountTextFieldAtom)

  function handleAmountChange(amount: number) {
    setValue(amount)
  }

  return {
    amount: value,
    changeAmount: handleAmountChange,
    resetAmountForm: resetAmountForm,
  }
}
