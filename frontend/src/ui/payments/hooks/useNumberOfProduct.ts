import { atom, useRecoilState, useResetRecoilState } from "recoil"

interface NumberOfProductSelect {
  value: number
}

const numberOfProductAtom = atom<NumberOfProductSelect>({
  key: "payments-number-of-product-atom",
  default: {
    value: 1,
  },
})

export function useNumberOfProduct() {
  const [numberOfProduct, setNumberOfProduct] =
    useRecoilState(numberOfProductAtom)
  const resetNumberOfProductSelect = useResetRecoilState(numberOfProductAtom)

  function handleNumberOfProductChange(numberOfProduct: number) {
    setNumberOfProduct({ value: numberOfProduct })
  }

  return {
    numberOfProduct: numberOfProduct.value,
    changeNumberOfProduct: handleNumberOfProductChange,
    resetNumberOfProductSelect: resetNumberOfProductSelect,
  }
}
