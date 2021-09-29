import { atom, useRecoilState, useResetRecoilState } from "recoil"

interface NumberOfProductSelect {
  value: number
}

const numberOfProductSelectAtom = atom<NumberOfProductSelect>({
  key: "payments-number-of-product-atom",
  default: {
    value: 1,
  },
})

export function useNumberOfProductSelect() {
  const [numberOfProduct, setNumberOfProduct] = useRecoilState(
    numberOfProductSelectAtom,
  )
  const resetNumberOfProductSelect = useResetRecoilState(
    numberOfProductSelectAtom,
  )

  function handleNumberOfProductChange(numberOfProduct: number) {
    setNumberOfProduct({ value: numberOfProduct })
  }

  return {
    numberOfProduct: numberOfProduct.value,
    changeNumberOfProduct: handleNumberOfProductChange,
    resetNumberOfProductSelect: resetNumberOfProductSelect,
  }
}
