import { TextField } from "@mui/material"
import React from "react"

interface ProductNameProps {
  productName: string
}

export function ReadOnlyProductNameForm({ productName }: ProductNameProps) {
  return (
    <>
      <TextField
        variant={"standard"}
        fullWidth
        label={"商品名"}
        defaultValue={productName}
        InputProps={{
          readOnly: true,
        }}
      />
    </>
  )
}
