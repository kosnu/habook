import { css } from "@emotion/react"
import {
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@material-ui/core"
import React, { useCallback } from "react"
import { useCategoriesQuery } from "../../../../graphql/types"
import { useLoginUser } from "../../../common/hooks/useLoginUser"
import { useCreatePayment } from "../hooks/useCreatePayment"

export function CategorySelect() {
  const { userId } = useLoginUser()
  const { categoryId, onCategoryIdChange } = useCreatePayment()
  const { data, loading } = useCategoriesQuery({
    variables: { userId: userId, enable: true },
  })

  const categories =
    (data?.categories &&
      data.categories.edges
        .filter((value): value is NonNullable<typeof value> => !!value)
        .map((edge) => edge.node)) ??
    []

  const handleChange = useCallback(
    (event) => {
      onCategoryIdChange(event.target.value)
    },
    [onCategoryIdChange],
  )

  return (
    <>
      <FormControl css={wrapperStyle}>
        <InputLabel id="category-select-label">カテゴリー</InputLabel>
        <Select
          labelId="category-select-label"
          id="category-select"
          value={categoryId}
          onChange={handleChange}
        >
          {loading && <CircularProgress />}
          {categories.length === 0 && (
            <MenuItem value={0}>選択肢がありません</MenuItem>
          )}
          {categories.map((category, index) => {
            return (
              <MenuItem key={index} value={category.id}>
                {category.name}
              </MenuItem>
            )
          })}
        </Select>
      </FormControl>
    </>
  )
}

const wrapperStyle = css`
  && {
    min-width: 200px;
    width: 200px;
  }
`
