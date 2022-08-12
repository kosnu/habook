import { css } from "@emotion/react"
import { Autocomplete, CircularProgress, TextField } from "@mui/material"
import React from "react"
import { ControllerRenderProps } from "react-hook-form"
import { CreatePaymentInput } from "../CreatePaymentForm"
import { useProducts } from "./useProducts"

interface ProductAutocompleteProps {
  // TODO: `react-hook-form` に依存しない型定義をしたい
  autocompleteProps: ControllerRenderProps<CreatePaymentInput, "productName">
  invalid?: boolean
  errorMessage?: string
  onChange: (inputvalue: string) => void
}

export function ProductAutocomplete({
  autocompleteProps,
  invalid,
  errorMessage,
  onChange,
}: ProductAutocompleteProps) {
  const { products, loading, error } = useProducts()

  function handleChange(event: React.SyntheticEvent, value: string | null) {
    value && onChange(value)
  }

  return (
    <>
      <Autocomplete
        freeSolo
        id={"combo-box-product-name"}
        options={products.map((product) => product.name)}
        loading={loading}
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
