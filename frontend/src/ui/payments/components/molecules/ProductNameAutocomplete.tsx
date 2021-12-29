import { css } from "@emotion/react"
import { Autocomplete, CircularProgress, Paper, TextField } from "@mui/material"
import React from "react"
import InfiniteScroll from "react-infinite-scroll-component"
import {
  ProductsAutocompleteQuery,
  ProductsAutocompleteQueryVariables,
  useProductsAutocompleteQuery,
} from "src/graphql/types"
import { LoadingCircular } from "src/ui/common/components/LoadingCircular"
import { useLoginUser } from "src/ui/common/hooks/useLoginUser"
import { connectionToNodes } from "src/ui/common/utils/connectionToNodes"
import { useProductNameAutocomplete } from "../../hooks/useProductNameAutocomplete"

export function ProductNameAutocomplete() {
  const { userId } = useLoginUser()
  const { productName, changeProductName } = useProductNameAutocomplete()
  const { data, loading, error, fetchMore } = useProductsAutocompleteQuery({
    variables: { userId: userId, productName: productName, limit: 30 },
    fetchPolicy: "network-only",
  })

  const products = connectionToNodes(data?.products)
  const pageInfo = data?.products.pageInfo

  function handleInputChange(_: React.ChangeEvent<unknown>, value: string) {
    changeProductName(value)
  }

  async function handleMoreFetch() {
    try {
      await fetchMore<
        ProductsAutocompleteQuery,
        ProductsAutocompleteQueryVariables
      >({
        variables: {
          cursor: pageInfo?.endCursor ?? "",
        },
      })
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <>
      <Autocomplete
        freeSolo
        id={"combo-box-product-name"}
        options={products.map((product) => product.name)}
        loading={loading}
        renderInput={(params) => (
          <TextField
            {...params}
            label={"商品名"}
            variant={"standard"}
            css={css`
              width: 400px;
            `}
            error={!!error}
            helperText={error?.message ?? ""}
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
        inputValue={productName}
        onInputChange={handleInputChange}
        PaperComponent={(props) => {
          // TODO: すべてをレンダリングしないようにする
          return (
            <InfiniteScroll
              height={300}
              dataLength={products.length}
              hasMore={pageInfo?.hasNextPage ?? false}
              next={handleMoreFetch}
              loader={<LoadingCircular loading={loading} />}
            >
              <Paper {...props} />
            </InfiniteScroll>
          )
        }}
      />
    </>
  )
}
