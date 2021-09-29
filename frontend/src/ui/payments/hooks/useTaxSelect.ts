import { atom, useRecoilState, useResetRecoilState } from "recoil"

const taxSelectAtom = atom({
  key: "payments-tax-select-atom",
  default: false,
})

export function useTaxSelect() {
  const [value, setValue] = useRecoilState(taxSelectAtom)
  const resetTaxSelect = useResetRecoilState(taxSelectAtom)

  function handleTaxChange(taxIncluded: boolean) {
    setValue(taxIncluded)
  }

  return {
    taxIncluded: value,
    changeTaxIncluded: handleTaxChange,
    resetTaxSelect: resetTaxSelect,
  }
}
