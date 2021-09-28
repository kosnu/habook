import { atom, useRecoilState, useResetRecoilState } from "recoil"

const PRODUCT_NAME_AUTOCOMPLETE_VALIDATION_MESSAGE = "商品名を入力してください"

interface ProductNameAutocomplete {
  value: string
  validation: {
    message: string | null
    isError: boolean
  }
}

interface NumberOfProductSelect {
  value: number
}

const productNameAtom = atom<ProductNameAutocomplete>({
  key: "payments-product-name-atom",
  default: {
    value: "",
    validation: {
      message: null,
      isError: false,
    },
  },
})

const numberOfProductAtom = atom<NumberOfProductSelect>({
  key: "payments-number-of-product-atom",
  default: {
    value: 1,
  },
})

export function useProductForm() {
  const [productName, setProductName] = useRecoilState(productNameAtom)
  const [numberOfProduct, setNumberOfProduct] =
    useRecoilState(numberOfProductAtom)
  const resetProductNameAutocomplete = useResetRecoilState(productNameAtom)
  const resetNumberOfProductSelect = useResetRecoilState(numberOfProductAtom)

  function handleProductNameChange(productName: string) {
    setProductName({
      value: productName,
      validation: {
        message: !productName
          ? PRODUCT_NAME_AUTOCOMPLETE_VALIDATION_MESSAGE
          : null,
        isError: !productName,
      },
    })
  }

  function handleProductNameValidate() {
    setProductName((currVal) => {
      return {
        ...currVal,
        validation: {
          message: !currVal.value
            ? PRODUCT_NAME_AUTOCOMPLETE_VALIDATION_MESSAGE
            : null,
          isError: !currVal.value,
        },
      }
    })
  }

  function handleNumberOfProductChange(numberOfProduct: number) {
    setNumberOfProduct({ value: numberOfProduct })
  }

  return {
    productName: productName.value,
    productNameAutocompleteValidation: productName.validation,
    numberOfProduct: numberOfProduct.value,
    changeProductName: handleProductNameChange,
    validateProductName: handleProductNameValidate,
    resetProductNameAutocomplete: resetProductNameAutocomplete,
    changeNumberOfProduct: handleNumberOfProductChange,
    resetNumberOfProductSelect: resetNumberOfProductSelect,
  }
}
