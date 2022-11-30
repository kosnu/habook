import { css } from "@emotion/react"
import { Autocomplete, CircularProgress, TextField } from "@mui/material"
import React, { useCallback } from "react"
import { ControllerRenderProps } from "react-hook-form"
import { PaymentFormInput, Product } from "../../types"
import { useProducts } from "./useProducts"

interface ProductAutocompleteProps {
  // TODO: `react-hook-form` に依存しない型定義をしたい
  autocompleteProps: ControllerRenderProps<PaymentFormInput, "productName">
  invalid?: boolean
  errorMessage?: string
  onInputChange: (inputValue: string) => void
  onChange: (productName: string) => void
}

export function ProductAutocomplete({
  autocompleteProps,
  invalid,
  errorMessage,
  onInputChange,
  onChange,
}: ProductAutocompleteProps) {
  const { products, loading, error } = useProducts()

  // TODO: エラー処理
  if (error) {
    console.error(error)
  }

  const handleInputChange = useCallback(
    (_event: React.SyntheticEvent, value: string) => {
      onInputChange(value)
    },
    [onInputChange],
  )

  const handleChange = useCallback(
    (_event: React.SyntheticEvent, value: string | Product | null) => {
      if (typeof value !== "string" && value) {
        onChange(value.name)
      }
    },
    [onChange],
  )

  return (
    <>
      <Autocomplete
        {...autocompleteProps}
        freeSolo
        id={"combo-box-product-name"}
        options={products}
        loading={loading}
        getOptionLabel={(option) =>
          typeof option === "string" ? option : option.name
        }
        isOptionEqualToValue={(option, value) => {
          if (typeof option === "string") return false

          return option.id === value.id
        }}
        onInputChange={handleInputChange}
        onChange={handleChange}
        renderInput={(params) => (
          <TextField
            {...params}
            label={"商品名"}
            variant={"standard"}
            css={css`
              width: 400px;
            `}
            error={invalid}
            helperText={errorMessage}
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <>
                  {loading && <CircularProgress color={"primary"} size={20} />}
                  {params.InputProps.endAdornment}
                </>
              ),
            }}
          />
        )}
        // PaperComponent={(props) => {
        //   // TODO: すべてをレンダリングしないようにする
        //   return (
        //     <InfiniteScroll
        //       height={300}
        //       dataLength={products.length}
        //       hasMore={pageInfo?.hasNextPage ?? false}
        //       next={handleMoreFetch}
        //       loader={<LoadingCircular loading={loading} />}
        //     >
        //       <Paper {...props} />
        //     </InfiniteScroll>
        //   )
        // }}
      />
    </>
  )
}
