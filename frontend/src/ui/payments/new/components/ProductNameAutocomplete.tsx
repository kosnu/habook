import { css } from "@emotion/react"
import { CircularProgress, Paper, TextField } from "@material-ui/core"
import { Autocomplete } from "@material-ui/lab"
import React, { useCallback } from "react"
import InfiniteScroll from "react-infinite-scroll-component"
import {
  ProductsQuery,
  ProductsQueryVariables,
  useProductsQuery,
} from "../../../../graphql/types"
import { LoadingCircular } from "../../../common/components/LoadingCircular"
import { useLoginUser } from "../../../common/hooks/useLoginUser"
import { useCreatePayment } from "../hooks/useCreatePayment"

export function ProductNameAutocomplete() {
  const { userId } = useLoginUser()
  const { productName, onProductNameChange } = useCreatePayment()
  const { data, loading, error, fetchMore } = useProductsQuery({
    variables: { userId: userId, productName: productName, limit: 30 },
    fetchPolicy: "network-only",
  })

  const products =
    data?.products.edges
      .filter((value): value is NonNullable<typeof value> => value !== null)
      .map((edge) => edge.node) ?? []
  const pageInfo = data?.products.pageInfo

  const handleInputChange = useCallback(
    (_: React.ChangeEvent<unknown>, value: string) => {
      onProductNameChange(value)
    },
    [onProductNameChange],
  )

  const handleMoreFetch = useCallback(async () => {
    try {
      await fetchMore<ProductsQuery, ProductsQueryVariables>({
        variables: {
          cursor: pageInfo?.endCursor ?? "",
        },
      })
    } catch (e) {
      console.error(e)
    }
  }, [fetchMore, pageInfo?.endCursor])

  return (
    <>
      <Autocomplete
        freeSolo
        id="combo-box-product-name"
        options={products.map((product) => product.name)}
        css={wrapperProductNameFormStyle}
        loading={loading}
        renderInput={(params) => (
          <TextField
            {...params}
            label="商品名"
            variant="standard"
            error={!!error}
            helperText={error?.message ?? ""}
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <>
                  {loading && <CircularProgress color="primary" size={20} />}
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

const wrapperProductNameFormStyle = css`
  && {
    min-width: 320px;
    width: 320px;
  }
`
