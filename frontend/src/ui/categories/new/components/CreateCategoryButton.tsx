import { Button } from "@material-ui/core"
import { Create as CreateIcon } from "@material-ui/icons"
import React from "react"

interface CreateCategoryButtonProps {
  onClick: () => void
}

export function CreateCategoryButton({ onClick }: CreateCategoryButtonProps) {
  return (
    <>
      <Button
        variant="contained"
        color="primary"
        startIcon={<CreateIcon />}
        onClick={onClick}
      >
        カテゴリーの作成を確定する
      </Button>
    </>
  )
}
