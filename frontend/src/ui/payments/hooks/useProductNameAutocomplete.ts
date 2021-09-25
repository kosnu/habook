import { atom, useRecoilState, useResetRecoilState } from "recoil"

const PRODUCT_NAME_AUTOCOMPLETE_VALIDATION_MESSAGE = "商品名を入力してください"

interface ProductNameAutocomplete {
  productName: string
  validation: {
    message: string | null
    isError: boolean
  }
}

const productNameAtom = atom<ProductNameAutocomplete>({
  key: "payments-product-name-atom",
  default: {
    productName: "",
    validation: {
      message: null,
      isError: false,
    },
  },
})

export function useProductNameAutocomplete() {
  const [value, setValue] = useRecoilState(productNameAtom)
  const resetProductNameAutocomplete = useResetRecoilState(productNameAtom)

  function handleProductNameChange(productName: string) {
    setValue({
      productName: productName,
      validation: {
        message: !productName
          ? PRODUCT_NAME_AUTOCOMPLETE_VALIDATION_MESSAGE
          : null,
        isError: !productName,
      },
    })
  }

  function handleProductNameValidate() {
    setValue((currVal) => {
      return {
        ...currVal,
        validation: {
          message: !currVal.productName
            ? PRODUCT_NAME_AUTOCOMPLETE_VALIDATION_MESSAGE
            : null,
          isError: !currVal.productName,
        },
      }
    })
  }

  return {
    productName: value.productName,
    productNameAutocompleteValidation: value.validation,
    changeProductName: handleProductNameChange,
    validateProductName: handleProductNameValidate,
    resetProductNameAutocomplete: resetProductNameAutocomplete,
  }
}
