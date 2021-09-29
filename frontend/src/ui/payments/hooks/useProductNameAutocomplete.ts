import { atom, useRecoilState, useResetRecoilState } from "recoil"

const PRODUCT_NAME_AUTOCOMPLETE_VALIDATION_MESSAGE = "商品名を入力してください"

interface ProductNameAutocomplete {
  value: string
  validation: {
    message: string | null
    isError: boolean
  }
}

const productNameAutocompleteAtom = atom<ProductNameAutocomplete>({
  key: "payments-product-name-autocomplete-atom",
  default: {
    value: "",
    validation: {
      message: null,
      isError: false,
    },
  },
})

export function useProductNameAutocomplete() {
  const [productName, setProductName] = useRecoilState(
    productNameAutocompleteAtom,
  )
  const resetProductNameAutocomplete = useResetRecoilState(
    productNameAutocompleteAtom,
  )

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

  return {
    productName: productName.value,
    productNameAutocompleteValidation: productName.validation,
    changeProductName: handleProductNameChange,
    validateProductName: handleProductNameValidate,
    resetProductNameAutocomplete: resetProductNameAutocomplete,
  }
}
