import { css } from "@emotion/react"
import {
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material"
import React from "react"
import { useCategoriesQuery } from "../../../../graphql/types"
import { useLoginUser } from "../../../common/hooks/useLoginUser"
import { connectionToNodes } from "../../../common/utils/connectionToNodes"
import { useCategorySelect } from "../../hooks/useCategorySelect"

export function CategorySelect() {
  const { userId } = useLoginUser()
  const { categoryId, changeCategory } = useCategorySelect()
  const { data, loading } = useCategoriesQuery({
    variables: { userId: userId, enable: true },
  })

  const categories = connectionToNodes(data?.categories)

  function handleChange(event: SelectChangeEvent) {
    changeCategory(event.target.value as string)
  }

  return (
    <>
      <FormControl css={wrapperStyle}>
        <InputLabel id="category-select-label">カテゴリー</InputLabel>
        <Select
          labelId="category-select-label"
          id="category-select"
          variant={"standard"}
          value={categoryId}
          onChange={handleChange}
        >
          {loading && <CircularProgress />}
          {categories.length === 0 && (
            <MenuItem value={""}>選択肢がありません</MenuItem>
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
